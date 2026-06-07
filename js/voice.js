/* VOICE ASSISTANT */

const voiceBtn =
document.getElementById(
  "voice-btn"
);

/* SPEECH RECOGNITION */
const SpeechRecognition =

window.SpeechRecognition ||

window.webkitSpeechRecognition;

if (voiceBtn && SpeechRecognition) {

const recognition =
new SpeechRecognition();

/* SETTINGS */
recognition.lang = "en-US";
// recognition.lang = "hi-IN";
recognition.continuous = false;

recognition.interimResults = false;

let isListening = false;

/* CLICK TOGGLE */
voiceBtn.addEventListener(
  "click",
  ()=>{
    if (isListening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
      } catch (err) {
        console.error("Speech recognition start failed:", err);
      }
    }
  }
);

/* START EVENT */
recognition.addEventListener(
  "start",
  ()=>{
    isListening = true;
    voiceBtn.classList.add("listening");
  }
);

/* RESULT */
recognition.addEventListener(
  "result",
  (e)=>{
    const transcript = e.results[0][0].transcript.toLowerCase();
    handleCommand(transcript);
  }
);

/* END */
recognition.addEventListener(
  "end",
  ()=>{
    isListening = false;
    voiceBtn.classList.remove("listening");
  }
);

/* SPEAK */
function speak(text){

  const speech =
  new SpeechSynthesisUtterance(
    text
  );

  speech.rate = 1;

  speech.pitch = 1;

  speech.volume = 1;

  window.speechSynthesis.speak(
    speech
  );

}

/* COMMANDS */
function handleCommand(command){

  console.log(command);

  /* PROJECTS */
  if(
    command.includes("project")
  ){

    speak(
      "Opening projects page"
    );

    window.location.href =
    "projects.html";

  }

  /* ABOUT */
  else if(
    command.includes("about")
  ){

    speak(
      "Opening about page"
    );

    window.location.href =
    "about.html";

  }

  /* CONTACT */
  else if(
    command.includes("contact")
  ){

    speak(
      "Opening contact page"
    );

    window.location.href =
    "contact.html";

  }

  /* BLOG */
  else if(
    command.includes("blog")
  ){

    speak(
      "Opening blog page"
    );

    window.location.href =
    "blog.html";

  }

  /* HOME */
  else if(
    command.includes("home")
  ){

    speak(
      "Opening home page"
    );

    window.location.href =
    "index.html";

  }

  /* UNKNOWN */
  else{

    speak(
      "Sorry, command not recognized."
    );

  }

}

}