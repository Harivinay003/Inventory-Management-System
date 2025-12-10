import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAaxEVWmQd7E00RPMfaCJEIFV72jT50904",
  authDomain: "inventory-management-9e66e.firebaseapp.com",
  projectId: "inventory-management-9e66e",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
