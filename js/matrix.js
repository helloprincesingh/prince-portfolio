/* MATRIX EFFECT */

const canvas =
document.getElementById(
  "matrix"
);

if (canvas && canvas.getContext) {

const ctx =
canvas.getContext("2d");

/* SIZE */
canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

/* LETTERS */
const letters =
"01アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ";

const chars =
letters.split("");

const fontSize = 16;

const columns =
canvas.width / fontSize;

const drops = [];

/* INIT */
for(let i=0;i<columns;i++){

  drops[i] = 1;

}

/* DRAW */
function draw(){

  ctx.fillStyle =
  "rgba(2,6,23,0.08)";

  ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ctx.fillStyle =
  "#00ff88";

  ctx.font =
  fontSize + "px monospace";

  for(let i=0;i<drops.length;i++){

    const text =
    chars[
      Math.floor(
        Math.random() * chars.length
      )
    ];

    ctx.fillText(

      text,

      i * fontSize,

      drops[i] * fontSize

    );

    if(

      drops[i] * fontSize >
      canvas.height &&

      Math.random() > 0.975

    ){

      drops[i] = 0;

    }

    drops[i]++;

  }

}

/* SPEED */
setInterval(draw,35);

/* RESIZE */
window.addEventListener(
  "resize",
  ()=>{

    canvas.width =
    window.innerWidth;

    canvas.height =
    window.innerHeight;

  }
);

}