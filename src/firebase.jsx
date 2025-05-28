import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "Group_9",
    authDomain: "group-9.firebaseapp.com",
    projectId: "group-9",
    storageBucket: "group-9.appspot.com",
    messagingSenderId: "1234567890",
    appId: "group-9-app-id",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
