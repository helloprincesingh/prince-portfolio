import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  // Clear previous auth nodes to avoid duplicating them
  const existingLogin = document.getElementById("nav-login");
  if (existingLogin) existingLogin.remove();
  const existingSignup = document.getElementById("nav-signup");
  if (existingSignup) existingSignup.remove();
  const existingAdmin = document.getElementById("nav-admin");
  if (existingAdmin) existingAdmin.remove();
  const existingLogout = document.getElementById("nav-logout");
  if (existingLogout) existingLogout.remove();

  // Check if we are inside a subdirectory
  const isNested = window.location.pathname.includes("/admin/");
  const prefix = isNested ? "../" : "";

  if (user) {
    // Inject Admin Link
    const adminLink = document.createElement("a");
    adminLink.href = prefix + "admin/add-project.html";
    adminLink.id = "nav-admin";
    adminLink.textContent = "Admin";
    navbar.appendChild(adminLink);

    // Inject Logout Link
    const logoutLink = document.createElement("a");
    logoutLink.href = "#";
    logoutLink.id = "nav-logout";
    logoutLink.textContent = "Logout";
    logoutLink.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        await signOut(auth);
        alert("Logged out successfully! 🚀");
        window.location.href = prefix + "index.html";
      } catch (error) {
        console.error("Sign Out Error", error);
      }
    });
    navbar.appendChild(logoutLink);
  } else {
    // Inject Login Link
    const loginLink = document.createElement("a");
    loginLink.href = prefix + "login.html";
    loginLink.id = "nav-login";
    loginLink.textContent = "Login";
    navbar.appendChild(loginLink);

    // Inject Signup Link
    const signupLink = document.createElement("a");
    signupLink.href = prefix + "signup.html";
    signupLink.id = "nav-signup";
    signupLink.textContent = "Signup";
    navbar.appendChild(signupLink);
  }

  // Auto-highlight active link
  const currentHref = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = navbar.querySelectorAll("a");
  navLinks.forEach(link => {
    const linkHref = link.getAttribute("href");
    if (linkHref === currentHref) {
      link.classList.add("active");
    } else {
      if (linkHref !== currentHref) {
        link.classList.remove("active");
      }
    }
  });
});
