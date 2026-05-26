/* CHATBOT */

const chatToggle =
document.querySelector(".chat-toggle");

const chatBox =
document.querySelector(".chat-box");

const closeChat =
document.querySelector(".close-chat");

const chatInput =
document.querySelector(".chat-input input");

const sendBtn =
document.querySelector(".chat-input button");

const chatBody =
document.querySelector(".chat-body");

if (chatToggle) {

/* OPEN */
chatToggle.addEventListener(
  "click",
  ()=>{

    chatBox.classList.toggle(
      "active"
    );

  }
);

/* CLOSE */
closeChat.addEventListener(
  "click",
  ()=>{

    chatBox.classList.remove(
      "active"
    );

  }
);

/* SEND */
sendBtn.addEventListener(
  "click",
  sendMessage
);

chatInput.addEventListener(
  "keypress",
  (e)=>{

    if(e.key === "Enter"){

      sendMessage();

    }

  }
);

}

/* FUNCTION */
async function sendMessage(){

  const message =
  chatInput.value.trim();

  if(message === "") return;

  /* USER */
  const userDiv =
  document.createElement("div");

  userDiv.classList.add(
    "user-message"
  );

  userDiv.textContent =
  message;

  chatBody.appendChild(
    userDiv
  );

  /* CLEAR */
  chatInput.value = "";

  /* AI TYPING */
  const botDiv =
  document.createElement("div");

  botDiv.classList.add(
    "bot-message"
  );

  botDiv.textContent =
  "Thinking...";

  chatBody.appendChild(
    botDiv
  );

  /* SCROLL */
  chatBody.scrollTop =
  chatBody.scrollHeight;

  try{

    const response =
    await fetch(

      "http://localhost:3000/chat",

      {

        method:"POST",

        headers:{
          "Content-Type":
          "application/json"
        },

        body:JSON.stringify({
          message
        })

      }

    );

    const data =
    await response.json();

    botDiv.textContent =
    data.reply;

  }

  catch(error){

    botDiv.textContent =
    "AI response failed.";

  }

}