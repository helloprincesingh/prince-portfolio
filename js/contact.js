/* CONTACT FORM EFFECT */

const inputs =
document.querySelectorAll(
  ".input-group input,.input-group textarea"
);

inputs.forEach((input)=>{

  input.addEventListener("mousemove",(e)=>{

    const rect =
    input.getBoundingClientRect();

    const x =
    e.clientX - rect.left;

    const y =
    e.clientY - rect.top;

    input.style.background =
    `
    radial-gradient(
      circle at ${x}px ${y}px,
      rgba(124,58,237,0.15),
      rgba(255,255,255,0.03)
    )
    `;

  });

});