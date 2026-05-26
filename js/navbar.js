document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
     1. Theme Toggle & Icon Swap Logic
     ========================================================================== */
  const themeToggle = document.getElementById("theme-toggle");
  
  // Helper function to update the theme icon
  const updateThemeIcon = (isLight) => {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector("i");
    if (icon) {
      if (isLight) {
        icon.className = "fa-solid fa-sun";
      } else {
        icon.className = "fa-solid fa-moon";
      }
    }
  };

  // Toggle theme on click
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light");
      const isLight = document.body.classList.contains("light");
      localStorage.setItem("theme", isLight ? "light" : "dark");
      updateThemeIcon(isLight);
    });
  }

  // Load and apply saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    updateThemeIcon(true);
  } else {
    document.body.classList.remove("light");
    updateThemeIcon(false);
  }

  /* ==========================================================================
     2. Mobile Menu Toggling
     ========================================================================== */
  const menuBtn = document.getElementById("menu-btn");
  const navbar = document.getElementById("navbar");

  if (menuBtn && navbar) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent immediate body click trigger
      navbar.classList.toggle("active");
      const icon = menuBtn.querySelector("i");
      if (icon) {
        if (navbar.classList.contains("active")) {
          icon.className = "fa-solid fa-xmark";
        } else {
          icon.className = "fa-solid fa-bars";
        }
      }
    });

    // Close menu when clicking outside of it
    document.addEventListener("click", (e) => {
      if (navbar.classList.contains("active") && !navbar.contains(e.target) && !menuBtn.contains(e.target)) {
        navbar.classList.remove("active");
        const icon = menuBtn.querySelector("i");
        if (icon) {
          icon.className = "fa-solid fa-bars";
        }
      }
    });

    // Close menu when clicking navigation links (helps with transitions)
    const navLinks = navbar.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navbar.classList.remove("active");
        const icon = menuBtn.querySelector("i");
        if (icon) {
          icon.className = "fa-solid fa-bars";
        }
      });
    });
  }

  /* ==========================================================================
     3. Active Link Auto-Highlighting
     ========================================================================== */
  const navLinks = document.querySelectorAll(".navbar a");
  const currentHref = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach(link => {
    const linkHref = link.getAttribute("href");
    if (linkHref === currentHref) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});