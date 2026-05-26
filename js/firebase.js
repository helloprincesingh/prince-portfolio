 // FIREBASE

import { initializeApp }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

 
 const firebaseConfig = {
    apiKey: "AIzaSyAwIr7RlVrEOxvh21t61odWe5KixwQcBuc",
    authDomain: "prince-portfolio-b5530.firebaseapp.com",
    projectId: "prince-portfolio-b5530",
    storageBucket: "prince-portfolio-b5530.firebasestorage.app",
    messagingSenderId: "79273989569",
    appId: "1:79273989569:web:b67f74e8135329c2d58b40",
    measurementId: "G-5HS8T48MZX"
  };
/* INIT */

const app =
initializeApp(firebaseConfig);

/* AUTH */

export const auth =
getAuth(app);