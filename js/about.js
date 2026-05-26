/* ABOUT PAGE ANIMATION */

const aboutCards =
document.querySelectorAll(
  ".about-card,.skill-card"
);

aboutCards.forEach((card)=>{

  card.addEventListener("mousemove",(e)=>{

    const rect =
    card.getBoundingClientRect();

    const x =
    e.clientX - rect.left;

    const y =
    e.clientY - rect.top;

    card.style.background =
    `
    radial-gradient(
      circle at ${x}px ${y}px,
      rgba(124,58,237,0.25),
      rgba(255,255,255,0.03)
    )
    `;

  });

});

/* SKILL BAR ANIMATION */

const skillSection =
document.querySelector(".skill-bars");

const progressBars =
document.querySelectorAll(".progress-fill");

if (skillSection) {
  window.addEventListener("scroll",()=>{

    const sectionTop =
    skillSection.getBoundingClientRect().top;

    const triggerPoint =
    window.innerHeight - 100;

    if(sectionTop < triggerPoint){

      progressBars.forEach((bar)=>{

        bar.style.animationPlayState =
        "running";

      });

    }

  });
}