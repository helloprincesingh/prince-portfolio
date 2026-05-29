(function() {
  const canvas =
  document.getElementById(
    "particle-text"
  );
  if (!canvas) return;

  const ctx =
  canvas.getContext("2d", { willReadFrequently: true });

  /* SIZE */
  function resizeCanvas(){

    canvas.width =
    window.innerWidth;

    canvas.height = 500;

  }

  resizeCanvas();

  /* PARTICLES */
  let particles = [];

  /* CREATE TEXT */
  function createParticles(){

    particles = [];

    /* CLEAR */
    ctx.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    /* TEXT */
    ctx.fillStyle = "#ffffff";

    ctx.font =
    "bold 100px Arial";

    ctx.textAlign = "center";

    ctx.fillText(

      "PRINCE KUMAR",

      canvas.width / 2,

      250

    );

    /* DATA */
    const textData =
    ctx.getImageData(

      0,
      0,
      canvas.width,
      canvas.height

    );

    /* CLEAR */
    ctx.clearRect(

      0,
      0,
      canvas.width,
      canvas.height

    );

    /* CREATE */
    for(

      let y = 0;

      y < textData.height;

      y += 5

    ){

      for(

        let x = 0;

        x < textData.width;

        x += 5

      ){

        const index =

        (y * 4 * textData.width) +
        (x * 4) + 3;

        if(
          textData.data[index] > 128
        ){

          particles.push({

            x:
            Math.random() *
            canvas.width,

            y:
            Math.random() *
            canvas.height,

            targetX:x,

            targetY:y,

            size:2

          });

        }

      }

    }

  }

  /* ANIMATE */
  function animate(){

    ctx.clearRect(

      0,
      0,
      canvas.width,
      canvas.height

    );

    particles.forEach((p)=>{

      p.x +=
      (p.targetX - p.x) * 0.05;

      p.y +=
      (p.targetY - p.y) * 0.05;

      ctx.beginPath();

      ctx.arc(

        p.x,
        p.y,
        p.size,
        0,
        Math.PI * 2

      );

      ctx.fillStyle =
      "#8b5cf6";

      ctx.shadowBlur = 20;

      ctx.shadowColor =
      "#a855f7";

      ctx.fill();

    });

    requestAnimationFrame(
      animate
    );

  }

  /* START */
  createParticles();

  animate();

  /* RESIZE */
  window.addEventListener(
    "resize",
    ()=>{

      resizeCanvas();

      createParticles();

    }
  );
})();