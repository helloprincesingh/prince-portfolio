/* TAG CLOUD - RESPONSIVE SKILL SPHERE */

var texts = [
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
  "Three.js",
  "UI/UX",
  "Figma"
];

/* RESPONSIVE RADIUS */
function getSphereRadius() {
  var w = window.innerWidth;
  if (w < 360) return 100;
  if (w < 480) return 120;
  if (w < 640) return 150;
  if (w < 900) return 180;
  if (w < 1200) return 220;
  return 260;
}

var options = {
  radius: getSphereRadius(),
  maxSpeed: "normal",
  initSpeed: "normal",
  direction: 135,
  keep: true
};

/*
 * CENTER THE SPHERE
 * TagCloud absolutely positions every <span> relative to the .tagcloud element.
 * So centering .tagcloud itself (via absolute + translate) centers the whole sphere.
 * DO NOT touch display/flexbox on .tagcloud — that breaks span positioning.
 */
function centerTagCloud() {
  var el = document.querySelector(".tagcloud");
  if (!el) return;
  el.style.position  = "absolute";
  el.style.left      = "50%";
  el.style.top       = "50%";
  el.style.transform = "translate(-50%, -50%)";
}

/* INIT */
var tc = TagCloud(".tagcloud", texts, options);
centerTagCloud();

/* HANDLE RESIZE */
var resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    var newRadius = getSphereRadius();
    if (options.radius !== newRadius) {
      options.radius = newRadius;
      if (tc && typeof tc.destroy === "function") {
        tc.destroy();
      }
      tc = TagCloud(".tagcloud", texts, options);
      centerTagCloud();
    }
  }, 300);
});
