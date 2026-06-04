// admin/js/adminAuth.js
import { auth } from "../../js/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const ADMIN_EMAIL = "princesingh23032006@gmail.com";

// Check authentication state
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Not logged in
    alert("Unauthorized access. Please log in first.");
    window.location.href = "../login.html";
  } else if (!user.email || user.email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    // Logged in, but not the admin
    alert("Access Denied. You do not have admin privileges.");
    // Optionally sign them out so they don't stay logged in as a normal user if they shouldn't be
    // auth.signOut();
    window.location.href = "../index.html";
  } else {
    // Admin is logged in. Let them pass.
    console.log("Admin access granted.");
  }
});
