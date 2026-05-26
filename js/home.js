const typingText =
document.querySelector(".typing");

const words = [

  "AI Enthusiast",
  "Web Developer",
  "Frontend Developer",
  "Engineering Student"

];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect(){

  const currentWord =
  words[wordIndex];

  if(isDeleting){

    typingText.textContent =
    currentWord.substring(0,charIndex--);

  } else{

    typingText.textContent =
    currentWord.substring(0,charIndex++);

  }

  let speed =
  isDeleting ? 60 : 120;

  if(
    !isDeleting &&
    charIndex === currentWord.length
  ){

    speed = 1500;

    isDeleting = true;

  }

  else if(
    isDeleting &&
    charIndex === 0
  ){

    isDeleting = false;

    wordIndex =
    (wordIndex + 1) % words.length;

  }

  setTimeout(typeEffect,speed);

}

if (typingText) {
  typeEffect();
}

/* COUNTER ANIMATION */

const counters =
document.querySelectorAll(".counter");

counters.forEach((counter)=>{

  counter.innerText = "0";

  const updateCounter = ()=>{

    const target =
    +counter.getAttribute("data-target");

    const current =
    +counter.innerText;

    const increment =
    target / 100;

    if(current < target){

      counter.innerText =
      `${Math.ceil(current + increment)}`;

      setTimeout(updateCounter,20);

    } else{

      counter.innerText = target;

    }

  };

  updateCounter();

});


/* TERMINAL TYPING */

const terminalText =
document.querySelector(
  ".terminal-typing"
);

const terminalWords = [

  "building futuristic UI...",
  "creating AI platforms...",
  "deploying awesome projects...",
  "learning new technologies..."

];

let terminalIndex = 0;
let terminalChar = 0;
let terminalDelete = false;

function terminalEffect(){

  const current =
  terminalWords[terminalIndex];

  if(terminalDelete){

    terminalText.textContent =
    current.substring(0,terminalChar--);

  } else{

    terminalText.textContent =
    current.substring(0,terminalChar++);

  }

  let speed =
  terminalDelete ? 50 : 100;

  if(
    !terminalDelete &&
    terminalChar === current.length
  ){

    speed = 1500;

    terminalDelete = true;

  }

  else if(
    terminalDelete &&
    terminalChar === 0
  ){

    terminalDelete = false;

    terminalIndex =
    (terminalIndex + 1) %
    terminalWords.length;

  }

  setTimeout(terminalEffect,speed);

}

if (terminalText) {
  terminalEffect();
}