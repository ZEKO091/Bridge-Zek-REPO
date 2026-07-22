import json
import sys
import os
import tempfile
import wave
import threading
import time
import numpy as np

try:
    import sounddevice as sd
except Exception as e:
    print(json.dumps({"error": f"sounddevice: {e}"}))
    sys.exit(1)

try:
    from faster_whisper import WhisperModel
except Exception as e:
    print(json.dumps({"error": f"faster-whisper: {e}"}))
    sys.exit(1)

MODEL_SIZE = os.environ.get("WHISPER_MODEL", "tiny")
RECORD_TIMEOUT = float(os.environ.get("VTT_TIMEOUT", "30"))

model = None
recording = False
audio_data = []
sample_rate = 16000
stream = None

def ensure_model():
    global model
    if model is not None:
        return
    device = "cuda" if os.environ.get("VTT_GPU", "1") == "1" else "cpu"
    compute_type = "float16" if device == "cuda" else "int8"
    model = WhisperModel(MODEL_SIZE, device=device, compute_type=compute_type)

def audio_callback(indata, frames, time_info, status):
    if recording:
        audio_data.append(indata.copy())

def start_recording():
    global recording, audio_data, stream
    if recording:
        return {"status": "already_recording"}
    audio_data = []
    recording = True
    try:
        stream = sd.InputStream(
            samplerate=sample_rate,
            channels=1,
            dtype=np.float32,
            callback=audio_callback
        )
        stream.start()
        return {"status": "recording"}
    except Exception as e:
        recording = False
        return {"error": f"Failed to start recording: {e}"}

def stop_recording():
    global recording, stream
    if not recording:
        return {"error": "not_recording"}
    recording = False
    if stream:
        stream.stop()
        stream.close()
        stream = None
    if not audio_data:
        return {"text": ""}
    try:
        audio_np = np.concatenate(audio_data, axis=0).flatten()
        ensure_model()
        segments, info = model.transcribe(audio_np, beam_size=5, language="es")
        text_parts = []
        for seg in segments:
            text_parts.append(seg.text.strip())
        text = " ".join(text_parts)
        return {"text": text, "duration": f"{info.duration:.1f}s" if info.duration else ""}
    except Exception as e:
        return {"error": f"Transcription failed: {e}"}

def main():
    if len(sys.argv) > 1 and sys.argv[1] == "ping":
        try:
            sd.check_input_settings()
            print(json.dumps({"status": "ready", "devices": sd.query_devices()}))
        except Exception as e:
            print(json.dumps({"status": "error", "error": str(e)}))
        return

    if len(sys.argv) > 1 and sys.argv[1] == "record":
        duration = float(sys.argv[2]) if len(sys.argv) > 2 else 5.0
        try:
            audio = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1, dtype=np.float32)
            sd.wait()
            ensure_model()
            audio_flat = audio.flatten()
            segments, info = model.transcribe(audio_flat, beam_size=5, language="es")
            text = " ".join(seg.text.strip() for seg in segments)
            print(json.dumps({"text": text, "duration": f"{info.duration:.1f}s" if info.duration else f"{duration:.1f}s"}))
        except Exception as e:
            print(json.dumps({"error": str(e)}))
        return

    try:
        ensure_model()
        print(json.dumps({"status": "ready", "model": MODEL_SIZE}))
        sys.stdout.flush()
    except Exception as e:
        print(json.dumps({"error": f"Model load failed: {e}"}))
        sys.exit(1)

    for line in sys.stdin:
        line = line.strip()
        if not line:
            continue
        try:
            cmd = json.loads(line)
        except json.JSONDecodeError:
            continue
        action = cmd.get("action")
        result = None
        if action == "start":
            result = start_recording()
        elif action == "stop":
            result = stop_recording()
        elif action == "quit":
            break
        else:
            result = {"error": f"unknown_action: {action}"}
        if result:
            print(json.dumps(result))
            sys.stdout.flush()

if __name__ == "__main__":
    main()
