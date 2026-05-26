/* CURSOR TRAIL */

const trailContainer =
document.getElementById(
  "trail-container"
);

const colors = [

  "#8b5cf6",
  "#00ccff",
  "#00ff88",
  "#ff00ff"

];

/* MOUSE MOVE */
if (trailContainer) {
document.addEventListener(
  "mousemove",
  (e)=>{

    /* CREATE */
    const trail =
    document.createElement("div");

    trail.classList.add("trail");

    /* POSITION */
    trail.style.left =
    e.clientX + "px";

    trail.style.top =
    e.clientY + "px";

    /* RANDOM SIZE */
    const size =
    Math.random() * 10 + 8;

    trail.style.width =
    size + "px";

    trail.style.height =
    size + "px";

    /* RANDOM COLOR */
    trail.style.background =
    colors[
      Math.floor(
        Math.random() * colors.length
      )
    ];

    /* APPEND */
    trailContainer.appendChild(
      trail
    );

    /* REMOVE */
    setTimeout(()=>{

      trail.remove();

    },800);

  }
);
}