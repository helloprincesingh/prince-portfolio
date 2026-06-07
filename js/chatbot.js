/* CHATBOT - PROFESSIONAL AND INTERACTIVE UPGRADE */

document.addEventListener("DOMContentLoaded", () => {
  const chatToggle = document.querySelector(".chat-toggle");
  const chatBox = document.querySelector(".chat-box");
  const closeChat = document.querySelector(".close-chat");
  const chatInput = document.querySelector(".chat-input input");
  const sendBtn = document.querySelector(".chat-input button");
  const chatBody = document.querySelector(".chat-body");

  if (!chatBox) return;

  // 1. RESTRUCTURE DOM FOR FULL-SCREEN DESIGN & SUGGESTIONS
  const mainWrapper = document.createElement("div");
  mainWrapper.classList.add("chat-main-wrapper");

  const oldInput = document.querySelector(".chat-input");

  // Move body and input inside the centered main wrapper
  chatBox.insertBefore(mainWrapper, oldInput);
  mainWrapper.appendChild(chatBody);

  // Create suggestion chips
  const suggestionsDiv = document.createElement("div");
  suggestionsDiv.classList.add("chat-suggestions");

  const suggestionChips = [
    { text: "👤 About Prince", query: "Who is Prince Kumar?" },
    { text: "💻 Technical Skills", query: "What are your technical skills?" },
    { text: "🚀 Top Projects", query: "Tell me about your projects." },
    { text: "🎓 Education", query: "Where did you study?" },
    { text: "🤝 Freelance / Hire", query: "Are you available for freelance work?" },
    { text: "📞 Contact Info", query: "How can I contact you?" }
  ];

  suggestionChips.forEach(chipData => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.classList.add("suggestion-chip");
    chip.textContent = chipData.text;
    chip.addEventListener("click", () => {
      chatInput.value = chipData.query;
      sendMessage();
    });
    suggestionsDiv.appendChild(chip);
  });

  mainWrapper.appendChild(suggestionsDiv);
  mainWrapper.appendChild(oldInput);

  // 2. TOGGLE LOGIC
  if (chatToggle) {
    chatToggle.addEventListener("click", () => {
      chatBox.classList.add("active");
      document.body.classList.add("chat-active");
      chatInput.focus();
    });
  }

  if (closeChat) {
    closeChat.addEventListener("click", () => {
      chatBox.classList.remove("active");
      document.body.classList.remove("chat-active");
    });
  }

  if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage);
  }

  if (chatInput) {
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }

  // 3. SEND MESSAGE FUNCTION
  async function sendMessage() {
    const message = chatInput.value.trim();
    if (message === "") return;

    // Append User Message
    const userDiv = document.createElement("div");
    userDiv.classList.add("user-message");
    userDiv.textContent = message;
    chatBody.appendChild(userDiv);

    // Clear Input
    chatInput.value = "";

    // Append Bot Thinking Message
    const botDiv = document.createElement("div");
    botDiv.classList.add("bot-message");
    botDiv.textContent = "Thinking...";
    chatBody.appendChild(botDiv);

    // Auto scroll
    chatBody.scrollTop = chatBody.scrollHeight;

    try {
      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();
      botDiv.textContent = data.reply;
    } catch (error) {
      console.warn("Backend server not reachable. Using client-side fallback reply.");
      // Small simulated delay for realistic bot interaction
      setTimeout(() => {
        botDiv.textContent = getLocalFallbackReply(message);
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 450);
    }
  }
});

/* INTELLIGENT FALLBACK CHATBOT ENGINE */
function getLocalFallbackReply(message) {
  const msg = message.toLowerCase();

  if (msg.includes("project") || msg.includes("work") || msg.includes("portfolio") || msg.includes("built") || msg.includes("develop")) {
    return `Prince Kumar has built several innovative projects! 🚀

🌟 **EduCrush**
An AI-powered educational platform with interactive quizzes, career guidance tools, and customized learning paths.

🌟 **AI Resume Builder**
A smart resume generator featuring AI-assisted content writing, templates, and resume scoring.

🌟 **Gamified Learning**
An engaging portal with coding challenges, interactive tutorials, leaderboard ranking, and badging system.

🌟 **Admission Counselling**
A comprehensive portal designed to streamline college choices, eligibility checks, and application counselling.

Which project would you like to explore in detail?`;
  }

  if (msg.includes("skill") || msg.includes("tech") || msg.includes("code") || msg.includes("language") || msg.includes("capable") || msg.includes("know") || msg.includes("stack")) {
    return `Prince's Technical Stack & Expertise: 💻

• **Frontend Development**: HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS.
• **Backend Engineering**: Node.js, Express.js.
• **Databases & Cloud**: Supabase, MongoDB, Firebase.
• **AI & Analytics**: Python, TensorFlow, Machine Learning Concepts, Data Analysis.
• **Version Control & Tools**: Git, GitHub, VS Code, npm.

He is highly skilled in crafting intuitive responsive layouts and integrating conversational AI tools directly into web applications.`;
  }

  if (msg.includes("contact") || msg.includes("email") || msg.includes("phone") || msg.includes("reach") || msg.includes("social") || msg.includes("github") || msg.includes("linkedin")) {
    return `You can get in touch with Prince Kumar through any of these channels: 🤝

• 📧 **Email**: princesingh23032006@gmail.com
• 💼 **LinkedIn**: linkedin.com/in/prince-kumar-2303/
• 🌐 **GitHub**: github.com/princekumar2303
• 🐦 **Twitter/X**: twitter.com/princekumar2303
• 📍 **Location**: Dehradun, Uttarakhand, India

Feel free to fill out the form on the **Contact** page to send him a direct message!`;
  }

  if (msg.includes("education") || msg.includes("study") || msg.includes("college") || msg.includes("btech") || msg.includes("university")) {
    return `Prince's Educational Profile: 🎓

• **Degree**: Bachelor of Technology (B.Tech) in Computer Science & Engineering.
• **Institution**: JB Institute of Technology (JBIT), Dehradun, India.
• **Interests**: Full-Stack Web Development, Artificial Intelligence, Machine Learning, and Cloud Integrations.

He combines theoretical computer science knowledge with intensive practical project building to solve real-world problems.`;
  }

  if (msg.includes("freelance") || msg.includes("hire") || msg.includes("work") || msg.includes("available") || msg.includes("internship")) {
    return `Yes! Prince is actively available for: 💼

• **Freelance Projects**: Web application design, UI/UX upgrades, React frontend work, and AI bot integrations.
• **Internships**: Software development, frontend development, or AI/ML roles.
• **Collaborations**: Open-source contributions or tech startups.

Would you like to get his contact info or resume to proceed?`;
  }

  if (msg.includes("who are you") || msg.includes("about") || msg.includes("name") || msg.includes("prince") || msg.includes("introduce") || msg.includes("you do")) {
    return `Hello! I am Prince's AI Portfolio Assistant. 🤖

I am here to tell you about Prince Kumar—an AI/ML Engineer and Full-Stack Developer. He specializes in designing next-gen user interfaces, developing web architectures (React/Node.js), and deploying intelligent AI components.

Feel free to ask me about his **projects**, **skills**, **education**, or how to **hire** him!`;
  }

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("greet") || msg.includes("welcome")) {
    return `Hello there! 👋 I am Prince's AI Portfolio Assistant.

How can I help you today?
Feel free to click any of the suggestion chips below or ask me questions about Prince's works, skills, or studies!`;
  }

  return `That's an interesting question! 

Prince Kumar is a B.Tech Engineering Student and Developer specializing in React, Node.js, and AI integrations. 

Please explore:
• Click the **Technical Skills** or **Top Projects** button below to learn more about his capabilities.
• Check out the **Contact** page to connect with him directly!`;
}