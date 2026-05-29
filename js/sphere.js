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

/* OPTIONS */
const options = {

  radius:250,

  maxSpeed:"fast",

  initSpeed:"fast",

  direction:135,

  keep:true

};

/* START */
TagCloud(

  ".tagcloud",

  texts,

  options

);