// Firebase App (the core Firebase SDK) is always
// required and must be listed first
import * as firebase from 'firebase/app'
// Add the Firebase products that you want to use
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDujc3dEGQRXIGacm5JFiVHjgJbKt1Kw-4',
  authDomain: 'streak-stat.firebaseapp.com',
  databaseURL: 'https://streak-stat.firebaseio.com',
  projectId: 'streak-stat',
  storageBucket: 'streak-stat.appspot.com',
  messagingSenderId: '1042290280505',
  appId: '1:1042290280505:web:9f1d628e20a58d8337e5e8',
  measurementId: 'G-6WN3WHYD79',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export const firestore = firebase.firestore()
export const functions = firebase.functions()
export const auth = firebase.auth()
