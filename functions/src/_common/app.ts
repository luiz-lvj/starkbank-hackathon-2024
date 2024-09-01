import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDCv8buYzFFirTFZOpOSWPicOcTsDx0i9s",
    authDomain: "platao-hackathon.firebaseapp.com",
    projectId: "platao-hackathon",
    storageBucket: "platao-hackathon.appspot.com",
    messagingSenderId: "1058574006193",
    appId: "1:1058574006193:web:c48bf0cc02501ed9df6f90"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
