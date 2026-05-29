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

    console.warn("Backend server not reachable. Using client-side fallback reply.");
    botDiv.textContent = getLocalFallbackReply(message);

  }

}

/* INTELLIGENT FALLBACK CHATBOT ENGINE */
function getLocalFallbackReply(message) {
  const msg = message.toLowerCase();
  
  if (msg.includes("project") || msg.includes("work") || msg.includes("portfolio") || msg.includes("built") || msg.includes("develop")) {
    return "Prince has built several awesome projects! 🚀\n\n1. EduCrush: An AI-powered educational platform with interactive quizzes and career guidance.\n2. AI Resume Builder: A smart resume generator featuring AI-assisted content writing.\n3. Gamified Learning: Engaging platform with coding puzzles and achievement badges.\n4. Admission Counselling: A guiding platform for students looking for college counsel.\n\nWhich one would you like to know more about?";
  }
  
  if (msg.includes("skill") || msg.includes("tech") || msg.includes("code") || msg.includes("language") || msg.includes("capable") || msg.includes("know")) {
    return "Prince is highly proficient in modern web technologies! 💻\n\n• Frontend: HTML5, CSS3, JavaScript (ES6+), React.js, and Tailwind CSS.\n• Backend & Database: Node.js, Express, MongoDB, and Firebase.\n• Tools: Git, GitHub, and email integration.\n\nHe has over 100+ hours of coding experience and enjoys creating premium user interfaces!";
  }
  
  if (msg.includes("contact") || msg.includes("email") || msg.includes("phone") || msg.includes("reach") || msg.includes("hire") || msg.includes("social") || msg.includes("github") || msg.includes("linkedin")) {
    return "You can easily connect with Prince! 🤝\n\n• 📧 Email: princesingh23032006@gmail.com\n• 📞 Phone: +91 7256896349\n• 📍 Location: Bihar, India\n• 🌐 GitHub: github.com/helloprincesingh\n\nFeel free to send a message via the Contact Form on the Contact page!";
  }
  
  if (msg.includes("who are you") || msg.includes("about") || msg.includes("name") || msg.includes("prince") || msg.includes("introduce") || msg.includes("you do")) {
    return "I am Prince's AI Assistant! 🤖\n\nPrince Kumar is a passionate Frontend Developer, AI Enthusiast, and B.Tech Engineering Student at JB Institute of Technology, Dehradun. He loves building futuristic, clean, and interactive websites that make a real difference in educational technology.";
  }
  
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("greet") || msg.includes("welcome")) {
    return "Hello there! 👋 I am Prince's AI Assistant. How can I help you today? Ask me about Prince's projects, skills, or contact info!";
  }
  
  return "That's a great question! Prince is a talented B.Tech Engineering Student and Web Developer. He is skilled in React, Node.js, and AI integrations. Feel free to explore the 'Projects' or 'About' page to learn more, or use the 'Contact' page to get in touch directly!";
}