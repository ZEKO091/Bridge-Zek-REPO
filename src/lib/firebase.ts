import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth"
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs, Timestamp, deleteDoc, writeBatch } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAHJdjy3UxQBStSKkMRX0G65AOYhBQDm98",
  authDomain: "zek-bridge.firebaseapp.com",
  projectId: "zek-bridge",
  storageBucket: "zek-bridge.firebasestorage.app",
  messagingSenderId: "996451812709",
  appId: "1:996451812709:web:915cf3924178b452accd8c",
  measurementId: "G-HFVEY4JQJ6"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

export async function signUp(email: string, password: string, username: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  await setDoc(doc(db, "users", cred.user.uid), {
    username,
    email,
    createdAt: new Date().toISOString(),
    uid: cred.user.uid
  })
  return cred.user
}

export async function logIn(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password)
  return cred.user
}

export async function logOut() {
  await signOut(auth)
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}

export async function getUserProfile(uid: string) {
  const snap = await getDoc(doc(db, "users", uid))
  return snap.exists() ? snap.data() : null
}

// ── Active User Presence ──
const SESSION_ID = 'session_' + Math.random().toString(36).slice(2) + Date.now().toString(36)
const ACTIVE_TIMEOUT = 120000 // 2 minutes

export async function pingPresence() {
  try {
    await setDoc(doc(db, "presence", SESSION_ID), {
      lastSeen: Timestamp.now(),
      userAgent: navigator.userAgent.slice(0, 80),
    })
  } catch {}
}

export async function getActiveCount(): Promise<number> {
  try {
    const cutoff = Timestamp.fromMillis(Date.now() - ACTIVE_TIMEOUT)
    const q = query(collection(db, "presence"), where("lastSeen", ">=", cutoff))
    const snap = await getDocs(q)
    return snap.size
  } catch { return 0 }
}

// Cleanup stale entries (runs every 5 minutes)
setInterval(async () => {
  try {
    const cutoff = Timestamp.fromMillis(Date.now() - ACTIVE_TIMEOUT)
    const q = query(collection(db, "presence"), where("lastSeen", "<", cutoff))
    const snap = await getDocs(q)
    if (snap.empty) return
    const batch = writeBatch(db)
    snap.docs.forEach(d => batch.delete(d.ref))
    await batch.commit()
  } catch {}
}, 300000)
