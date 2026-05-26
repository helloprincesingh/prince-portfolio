const cursor =
document.querySelector(".cursor");

const blur =
document.querySelector(".cursor-blur");

if (cursor && blur) {
  /* MOVE CURSOR */
  document.addEventListener("mousemove",(e)=>{

    cursor.style.left =
    e.clientX + "px";

    cursor.style.top =
    e.clientY + "px";

    blur.style.left =
    e.clientX + "px";

    blur.style.top =
    e.clientY + "px";

  });

  /* HOVER EFFECT */
  const hoverItems =
  document.querySelectorAll(
    "a,button,.project-card,.about-card,.skill-card"
  );

  hoverItems.forEach((item)=>{

    item.addEventListener("mouseenter",()=>{

      cursor.style.transform =
      "translate(-50%,-50%) scale(1.8)";

    });

    item.addEventListener("mouseleave",()=>{

      cursor.style.transform =
      "translate(-50%,-50%) scale(1)";

    });

  });
}