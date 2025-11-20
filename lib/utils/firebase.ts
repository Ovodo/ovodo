import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA351r5OyocLmSrSnzcG7urhDyETV7flTw",
    authDomain: "african-producers.firebaseapp.com",
    projectId: "african-producers",
    storageBucket: "african-producers.appspot.com",
    messagingSenderId: "704139097438",
    appId: "1:704139097438:web:539e2c124ded9c6eec8bcf",
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export default app;
