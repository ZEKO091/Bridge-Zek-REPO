import json, sys, os, time, threading, numpy as np

os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"

try:
    import sounddevice as sd
except Exception as e:
    print(f"[VTT] Error: sounddevice — {e}", file=sys.stderr); sys.exit(1)

try:
    from faster_whisper import WhisperModel
except Exception as e:
    print(f"[VTT] Error: faster-whisper — {e}", file=sys.stderr); sys.exit(1)

try:
    import pyautogui
except Exception as e:
    print(f"[VTT] Error: pyautogui — {e}", file=sys.stderr); sys.exit(1)

try:
    import keyboard
except Exception as e:
    print(f"[VTT] Error: keyboard — {e}", file=sys.stderr); sys.exit(1)

MODEL = os.environ.get("WHISPER_MODEL", "tiny")
SAMPLE_RATE = 16000
USE_CUDA = os.environ.get("VTT_GPU", "").lower() in ("1", "true", "yes")

model = None
recording = False
audio_data = []
stream = None
ctrl_down = False

def load_model():
    global model
    if model: return
    device = "cuda" if USE_CUDA else "cpu"
    print(f"[VTT] Loading {MODEL} ({device})...", file=sys.stderr)
    model = WhisperModel(MODEL, device=device, compute_type="float16" if device == "cuda" else "int8")
    print(f"[VTT] Model ready", file=sys.stderr)

def start_recording():
    global recording, audio_data, stream
    if recording: return
    audio_data = []; recording = True
    def cb(indata, frames, time_info, status):
        if recording: audio_data.append(indata.copy())
    stream = sd.InputStream(samplerate=SAMPLE_RATE, channels=1, dtype=np.float32, callback=cb)
    stream.start()

def stop_recording():
    global recording, stream
    if not recording: return ""
    recording = False
    if stream:
        try: stream.stop(); stream.close()
        except: pass
        stream = None
    if not audio_data: return ""
    audio = np.concatenate(audio_data, axis=0).flatten()
    load_model()
    segments, _ = model.transcribe(audio, beam_size=5, language="es")
    return " ".join(s.text.strip() for s in segments)

def type_text(text):
    text = text.strip()
    if not text: return
    time.sleep(0.05)
    try:
        pyautogui.typewrite(text, interval=0.01)
        pyautogui.press("enter")
    except Exception as e:
        print(f"[VTT] Error typing: {e}", file=sys.stderr)

def on_event(e):
    global recording, ctrl_down
    if e.event_type == "down":
        if e.name in ("ctrl", "ctrl_l", "ctrl_r"):
            ctrl_down = True
        elif e.name == "space" and ctrl_down and not recording:
            print("[VTT] Recording...", file=sys.stderr)
            start_recording()
            return False
    elif e.event_type == "up":
        if e.name in ("ctrl", "ctrl_l", "ctrl_r"):
            ctrl_down = False
        elif e.name == "space" and recording:
            recording = False
            print("[VTT] Transcribing...", file=sys.stderr)
            text = stop_recording()
            if text:
                print(f"[VTT] {text}", file=sys.stderr)
                type_text(text)
            else:
                print("[VTT] No speech detected", file=sys.stderr)
            return False

def main():
    print("[VTT] Zek Bridge Voice — Ctrl+Space to talk", file=sys.stderr)
    print("[VTT] Checking microphones...", file=sys.stderr)
    try:
        devices = [d["name"] for d in sd.query_devices() if d["max_input_channels"] > 0]
        print(f"[VTT] {len(devices)} mic(s) found", file=sys.stderr)
    except Exception as e:
        print(f"[VTT] No mic: {e}", file=sys.stderr)
        sys.exit(1)

    if len(sys.argv) > 1 and sys.argv[1] == "record":
        dur = float(sys.argv[2]) if len(sys.argv) > 2 else 5.0
        audio = sd.rec(int(dur * SAMPLE_RATE), samplerate=SAMPLE_RATE, channels=1, dtype=np.float32); sd.wait()
        load_model()
        text = " ".join(s.text.strip() for s in model.transcribe(audio.flatten(), beam_size=5, language="es")[0])
        print(json.dumps({"text": text}))
        return

    keyboard.hook(on_event)
    print("[VTT] Ready. Hold Ctrl+Space to speak.", file=sys.stderr)
    print("[VTT] Press Ctrl+C to exit.", file=sys.stderr)
    try:
        threading.Event().wait()
    except KeyboardInterrupt:
        pass

if __name__ == "__main__":
    main()
