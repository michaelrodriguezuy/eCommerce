
import { initializeApp } from "firebase/app";
import {signInWithEmailAndPassword, getAuth, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth'

import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDGu_4Z3YrNRMZGOeSSQKnscFiEHsxrsMA",
  authDomain: "autenticacion-ecommerce-909f5.firebaseapp.com",
  projectId: "autenticacion-ecommerce-909f5",
  storageBucket: "autenticacion-ecommerce-909f5.appspot.com",
  messagingSenderId: "309313267186",
  appId: "1:309313267186:web:3fc5b8ce60e15732cf776b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export const db = getFirestore(app)

//LOGIN
export const login = async ({email, password}) => {
    try {        
        let res=await signInWithEmailAndPassword(auth, email, password)
        return res
    } catch (error) {
        console.log(error)
    }
}

//LOGOUT
export const logout =  () => {
    signOut(auth)    
}

//login con google
let provider = new GoogleAuthProvider()
export const loginGoogle = async () => {
    try {
        let res = await signInWithPopup(auth, provider)
        return res
    } catch (error) {
        console.log(error)
    }
}

//registro
export const register = async ({email, password}) => {
    try {
        let res = await createUserWithEmailAndPassword(auth, email, password)
        return res
    } catch (error) {
        console.log(error)
    }
}

//recuperar contraseña
export const resetPassword = async (email) => {
    try {
       let res = await sendPasswordResetEmail(auth, email)        
       return res
    } catch (error) {
        console.log(error)
    }
}