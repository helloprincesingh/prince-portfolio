/* TAG CLOUD */

const texts = [

  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "MongoDB",
  "Firebase",
  "Python",
  "AI",
  "Machine Learning",
  "Tailwind",
  "GitHub",
  "API",
  "UI/UX",
  "Three.js",
  "Figma"

];

/* OPTIONS & RADIUS FUNCTION */
function getSphereRadius() {
  const width = window.innerWidth;
  if (width < 480) return 110;
  if (width < 768) return 150;
  if (width < 1024) return 200;
  return 250;
}

const options = {
  radius: getSphereRadius(),
  maxSpeed: "fast",
  initSpeed: "fast",
  direction: 135,
  keep: true
};

/* START */
let tc = TagCloud(".tagcloud", texts, options);

/* HANDLE RESIZE */
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const newRadius = getSphereRadius();
    if (options.radius !== newRadius) {
      options.radius = newRadius;
      // Re-initialize tag cloud on size change
      if (tc && typeof tc.destroy === "function") {
        tc.destroy();
      }
      tc = TagCloud(".tagcloud", texts, options);
    }
  }, 250);
});