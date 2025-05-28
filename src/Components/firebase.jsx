import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "Group_9",
    authDomain: "group-9.firebaseapp.com",
    projectId: "group-9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
