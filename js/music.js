/* MUSIC SYSTEM */

const music =
document.getElementById(
  "background-music"
);

const musicToggle =
document.getElementById(
  "music-toggle"
);

/* STATE */
let isPlaying = false;

/* CLICK */
if (musicToggle && music) {
musicToggle.addEventListener(
  "click",
  ()=>{

    if(isPlaying){

      music.pause();

      musicToggle.classList.remove(
        "active"
      );

      isPlaying = false;

    } else{

      music.play();

      musicToggle.classList.add(
        "active"
      );

      isPlaying = true;

    }

  }
);
}