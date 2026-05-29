/* TYPING EFFECT */

const typingText =
document.querySelector(".typing-text");

/* CHECK */
if(typingText){

  const texts = [

    "Let's Build Something Amazing Together 🚀",

    "Creating Futuristic Digital Experiences ✨",

    "Building AI Powered Web Solutions 🤖"

  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect(){

    const currentText =
    texts[textIndex];

    /* TYPE */
    if(!isDeleting){

      typingText.textContent =
      currentText.substring(
        0,
        charIndex
      );

      charIndex++;

    }

    /* DELETE */
    else{

      typingText.textContent =
      currentText.substring(
        0,
        charIndex
      );

      charIndex--;

    }

    let speed =
    isDeleting ? 40 : 90;

    /* FINISH */
    if(
      !isDeleting &&
      charIndex >
      currentText.length
    ){

      isDeleting = true;

      speed = 1500;

    }

    /* NEXT */
    if(
      isDeleting &&
      charIndex < 0
    ){

      isDeleting = false;

      textIndex =
      (textIndex + 1) %
      texts.length;

      charIndex = 0;

    }

    setTimeout(
      typeEffect,
      speed
    );

  }

  typeEffect();

}