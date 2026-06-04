import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const ADMIN_EMAIL = "princesingh23032006@gmail.com";

onAuthStateChanged(auth, (user) => {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  // Clear previous dynamic auth nodes to avoid duplicate/leftover links
  const existingLogin = document.getElementById("nav-login");
  if (existingLogin) existingLogin.remove();
  const existingSignup = document.getElementById("nav-signup");
  if (existingSignup) existingSignup.remove();
  const existingLogout = document.getElementById("nav-logout");
  if (existingLogout) existingLogout.remove();
  const existingLogoutBtn = document.getElementById("nav-logout-btn");
  if (existingLogoutBtn) existingLogoutBtn.remove();
  const existingAdmin = document.getElementById("nav-admin");
  if (existingAdmin) existingAdmin.remove();

  // Check if we are inside a subdirectory (like /admin/)
  const isNested = window.location.pathname.includes("/admin/");
  const prefix = isNested ? "../" : "";

  // 1. Show or hide all hardcoded Admin links (.admin-nav-link)
  const adminLinks = document.querySelectorAll(".admin-nav-link");
  const isAdmin = user && user.email && user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  console.log("[Auth-Nav] User Email:", user ? user.email : "None", "| isAdmin:", isAdmin);

  if (isAdmin) {
    adminLinks.forEach(link => {
      link.style.display = "inline-block";
    });
  } else {
    adminLinks.forEach(link => {
      link.style.display = "none";
    });
  }

  // 2. Dynamically inject Login/Signup or Logout links
  if (user) {
    // Inject Logout Link (styled, bold, red with signout icon)
    const logoutLink = document.createElement("a");
    logoutLink.id = "nav-logout";
    logoutLink.href = "#";
    logoutLink.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i> Logout';
    logoutLink.style.color = "#ef4444";
    logoutLink.style.fontWeight = "600";
    logoutLink.style.cursor = "pointer";

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

  // 3. Highlight the active link in the navigation
  const currentHref = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = navbar.querySelectorAll("a");
  navLinks.forEach(link => {
    const linkHref = link.getAttribute("href");
    if (linkHref === currentHref || (linkHref && linkHref.endsWith(currentHref))) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
