import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* SIGNUP */

const signupForm =
document.getElementById("signup-form");

if (signupForm) {

  signupForm.addEventListener(
    "submit",

    async (e) => {

      e.preventDefault();

      const email =
      document.getElementById(
        "signup-email"
      ).value;

      const password =
      document.getElementById(
        "signup-password"
      ).value;

      try {

        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        alert(
          "Signup successful 🚀"
        );

        window.location.href =
        "login.html";

      }

      catch (error) {

        alert(error.message);

      }

    }

  );

}

/* LOGIN */

const loginForm =
document.getElementById("login-form");

if (loginForm) {

  loginForm.addEventListener(
    "submit",

    async (e) => {

      e.preventDefault();

      const email =
      document.getElementById(
        "login-email"
      ).value;

      const password =
      document.getElementById(
        "login-password"
      ).value;

      try {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        alert(
          "Login successful 🚀"
        );

        window.location.href =
        "index.html";

      }

      catch (error) {

        alert(error.message);

      }

    }

  );

}

/* GOOGLE LOGIN */

const googleBtn =
document.getElementById(
"google-login"
);

if (googleBtn) {

  googleBtn.addEventListener(
    "click",

    async () => {

      try {

        const provider =
        new GoogleAuthProvider();

        await signInWithPopup(
          auth,
          provider
        );

        alert(
          "Google Login Successful 🚀"
        );

        window.location.href =
        "index.html";

      }

      catch (error) {

        alert(error.message);

      }

    }

  );

}

/* FORGOT PASSWORD */

const forgotBtn =
document.getElementById(
"forgot-password"
);

if (forgotBtn) {

  forgotBtn.addEventListener(
    "click",

    async () => {

      const email = prompt(
        "Enter your email"
      );

      if (!email) return;

      try {

        await sendPasswordResetEmail(
          auth,
          email
        );

        alert(
          "Password reset email sent 📩"
        );

      }

      catch (error) {

        alert(error.message);

      }

    }

  );

}