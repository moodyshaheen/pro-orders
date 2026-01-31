import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyB7-7OwOBe0VuF6xTOJ1OKYU6WiK7jsN48",
  authDomain: "modernstore-43846.firebaseapp.com",
  projectId: "modernstore-43846",
  storageBucket: "modernstore-43846.firebasestorage.app",
  messagingSenderId: "373219020189",
  appId: "1:373219020189:web:cf5dc6fb6042648c0af374",
  measurementId: "G-ZGLSRWXREK"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)