/* RANDOM GLITCH */

const glitchElements =
document.querySelectorAll(
  ".glitch"
);

/* LOOP */
setInterval(()=>{

  glitchElements.forEach((el)=>{

    el.style.animation =
    "none";

    void el.offsetWidth;

    el.style.animation =
    "glitchMain 0.2s";

  });

},4000);