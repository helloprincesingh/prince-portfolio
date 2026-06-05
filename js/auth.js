import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

/* ERROR HANDLER */
function handleAuthError(error) {
  console.error("Firebase Auth Error:", error);

  if (
    error.code === "auth/network-request-failed" ||
    (error.message &&
      error.message.includes("network-request-failed"))
  ) {
    alert(
      "Network Error. Check internet connection or disable ad blockers."
    );
  } else {
    alert(error.message);
  }
}

/* ==========================
   SIGNUP
========================== */

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
          "Account Created Successfully 🚀"
        );

        window.location.href = "login.html";

      } catch (error) {

        handleAuthError(error);

      }

    }
  );

}

/* ==========================
   LOGIN
========================== */

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
          "Login Successful 🚀"
        );

        window.location.href =
          "../admin/dashboard.html";

      } catch (error) {

        handleAuthError(error);

      }

    }
  );

}

/* ==========================
   GOOGLE LOGIN
========================== */

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
          "../admin/dashboard.html";

      } catch (error) {

        handleAuthError(error);

      }

    }
  );

}

/* ==========================
   FORGOT PASSWORD
========================== */
const forgotBtn =
  document.getElementById(
    "forgot-password"
  );

if (forgotBtn) {

  forgotBtn.addEventListener(
    "click",
    async () => {

      const email =
        document
          .getElementById("reset-email")
          .value
          .trim();

      if (!email) {
        alert("Please enter your registered email.");
        return;
      }

      try {

        await sendPasswordResetEmail(
          auth,
          email
        );

        alert(
          "Password reset email sent 📩"
        );

      } catch (error) {

        handleAuthError(error);

      }

    }
  );

}