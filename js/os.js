/* DRAG WINDOW */

const windowBox =
document.getElementById(
  "window"
);

const dragArea =
document.getElementById(
  "drag-area"
);

let isDragging = false;

let offsetX, offsetY;

/* MOUSE DOWN */
dragArea.addEventListener(
  "mousedown",
  (e)=>{

    isDragging = true;

    offsetX =
    e.clientX -
    windowBox.offsetLeft;

    offsetY =
    e.clientY -
    windowBox.offsetTop;

  }
);

/* MOVE */
document.addEventListener(
  "mousemove",
  (e)=>{

    if(isDragging){

      windowBox.style.left =

      e.clientX - offsetX
      + "px";

      windowBox.style.top =

      e.clientY - offsetY
      + "px";

    }

  }
);

/* UP */
document.addEventListener(
  "mouseup",
  ()=>{

    isDragging = false;

  }
);

/* TERMINAL COMMANDS */

const commandInput =
document.getElementById(
  "terminal-command"
);

commandInput.addEventListener(
  "keypress",
  (e)=>{

    if(e.key === "Enter"){

      const command =
      commandInput.value
      .toLowerCase();

      handleCommand(
        command
      );

      commandInput.value = "";

    }

  }
);

/* FUNCTION */
function handleCommand(command){

  /* HOME */
  if(command === "home"){

    window.location.href =
    "index.html";

  }

  /* ABOUT */
  else if(command === "about"){

    window.location.href =
    "about.html";

  }

  /* PROJECTS */
  else if(command === "projects"){

    window.location.href =
    "projects.html";

  }

  /* BLOG */
  else if(command === "blog"){

    window.location.href =
    "blog.html";

  }

  /* CONTACT */
  else if(command === "contact"){

    window.location.href =
    "contact.html";

  }

  /* HELP */
  else if(command === "help"){

    alert(

      `
      Commands:

      home
      about
      projects
      blog
      contact
      `

    );

  }

  else{

    alert(
      "Unknown command"
    );

  }

}




