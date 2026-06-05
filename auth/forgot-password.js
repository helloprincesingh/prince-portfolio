import { auth } from "../js/firebase.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const forgotForm = document.getElementById("forgot-password-form");

if (forgotForm) {
  forgotForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("reset-email").value.trim();

    if (!email) {
      alert("Please enter your registered email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Reset Email Sent");
      window.location.href = "login.html";
    } catch (error) {
      alert(error.message);
    }
  });
}
