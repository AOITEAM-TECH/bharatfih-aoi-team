(function () {
  "use strict";

  /* =========================================================
     CONFIG
  ========================================================= */

  const CONFIG = {
    botName: "Team Assistant",
    typingDelay: 450,
    maxMessageLength: 500
  };

  /* =========================================================
     SAFE DATA LOADING
  ========================================================= */

  const teamList =
    typeof TEAM_MEMBERS !== "undefined" && Array.isArray(TEAM_MEMBERS)
      ? TEAM_MEMBERS
          .map((m) => `${m.name} (${m.role})`)
          .join(", ")
      : "The team list is currently unavailable.";

  const pptList =
    typeof TRAINING_RESOURCES !== "undefined" &&
    Array.isArray(TRAINING_RESOURCES)
      ? TRAINING_RESOURCES
          .filter((r) => r.type === "ppt")
          .map((r) => r.title)
          .join(", ")
      : "LASER, SPP, SPI, NXT – Component Mounting, PRE AOI, POST AOI, VI MATERIAL, Holly AOI Training Guideline RGB";

  /* =========================================================
     FAQ DATABASE
  ========================================================= */

  const FAQS = [
    {
      keywords: ["smt", "surface mount", "surface mount technology"],
      answer:
        "SMT stands for Surface Mount Technology. It is the process of mounting electronic components directly onto the surface of a PCB. In our production line, SMT includes processes such as solder paste printing, SPI, component placement, reflow and AOI."
    },

    {
      keywords: ["spi", "solder paste inspection", "paste inspection"],
      answer:
        "SPI stands for Solder Paste Inspection. It is performed after stencil printing and checks solder paste parameters such as volume, height, area and alignment. SPI acts as one of the earliest quality checkpoints in the SMT line."
    },

    {
      keywords: ["aoi stage 1", "aoi 1", "stage 1", "first aoi"],
      answer:
        "AOI Stage 1 is performed after reflow soldering. It automatically checks the PCB for problems such as missing components, shifted components, polarity issues and placement defects."
    },

    {
      keywords: [
        "aoi stage 2",
        "aoi 2",
        "stage 2",
        "final aoi",
        "final inspection"
      ],
      answer:
        "AOI Stage 2 is the final optical inspection stage. It is normally performed after required rework and verifies that the PCB is ready to move to the next process."
    },

    {
      keywords: [
        "aoi",
        "automatic optical inspection",
        "optical inspection"
      ],
      answer:
        "AOI stands for Automatic Optical Inspection. It uses cameras and inspection software to detect PCB assembly defects. Our process uses AOI at two stages: Stage 1 after reflow and Stage 2 as the final inspection."
    },

    {
      keywords: [
        "process",
        "process flow",
        "flow",
        "production flow",
        "steps",
        "how does it work"
      ],
      answer:
        "The basic SMT process flow is: Paste Printing → SPI → Component Placement → Reflow → AOI Stage 1 → Rework if required → AOI Stage 2."
    },

    {
      keywords: [
        "component placement",
        "placement",
        "mounting",
        "pick and place"
      ],
      answer:
        "Component placement is the process of accurately placing electronic components onto the PCB using a pick-and-place machine. The placement process happens after solder paste inspection and before reflow."
    },

    {
      keywords: ["reflow", "reflow soldering", "reflow oven"],
      answer:
        "Reflow soldering uses a controlled temperature profile to melt the solder paste and permanently solder components to the PCB. AOI Stage 1 is performed after reflow."
    },

    {
      keywords: [
        "team",
        "team member",
        "members",
        "who is on the team",
        "who's on the team"
      ],
      answer: `The current team members are: ${teamList}.`
    },

    {
      keywords: [
        "lead",
        "team lead",
        "manager",
        "in charge",
        "supervisor"
      ],
      answer:
        "Saravanan V is the Team Lead for SPI & AOI."
    },

    {
      keywords: [
        "ppt",
        "training deck",
        "training decks",
        "slides",
        "presentation",
        "training material"
      ],
      answer: `Available training decks include: ${pptList}. You can open the Training page from the top navigation to view or download them.`
    },

    {
      keywords: [
        "training",
        "learn",
        "study",
        "training page"
      ],
      answer:
        "The Training page contains PPTs and reference materials related to LASER, SPP, SPI, NXT Component Mounting, PRE AOI, POST AOI and other SMT-related topics."
    },

    {
      keywords: [
        "image",
        "images",
        "gallery",
        "photo",
        "photos",
        "reference image"
      ],
      answer:
        "Reference images are available at the end of the Training gallery, after the training PPTs. Open the Training page from the top navigation."
    },

    {
      keywords: [
        "login",
        "password",
        "sign in",
        "credentials",
        "forgot password"
      ],
      answer:
        "Each team member has their own login credentials. If you have forgotten your password, please contact your team lead. Credentials are managed separately from this FAQ assistant."
    },

    {
      keywords: [
        "quality",
        "quality check",
        "quality inspection",
        "inspection"
      ],
      answer:
        "Quality inspection is performed at multiple points in the SMT process. SPI checks solder paste quality, while AOI checks component placement and soldering-related visual defects."
    },

    {
      keywords: [
        "pcb",
        "printed circuit board",
        "board"
      ],
      answer:
        "A PCB, or Printed Circuit Board, mechanically supports electronic components and electrically connects them through copper tracks, pads and vias."
    },

    {
      keywords: [
        "hello",
        "hi",
        "hey",
        "good morning",
        "good afternoon",
        "good evening"
      ],
      answer:
        "Hey! 👋 I'm the Team Assistant. You can ask me about SMT, SPI, AOI, the production process, team members or training materials."
    },

    {
      keywords: [
        "thank you",
        "thanks",
        "thank"
      ],
      answer:
        "You're welcome! 😊 Let me know if you have any other questions."
    }
  ];

  /* =========================================================
     FALLBACK RESPONSES
  ========================================================= */

  const FALLBACKS = [
    "I don't have a specific answer for that yet. Try asking about SMT, SPI, AOI, the process flow, the team or training materials.",

    "I'm currently trained mainly for SMT, SPI, AOI and team-related FAQs. Try asking something like “What is SPI?” or “What is the SMT process flow?”",

    "I couldn't find a matching FAQ. You can check the Process or Training section of the portfolio page for more information."
  ];

  /* =========================================================
     NORMALIZE TEXT
  ========================================================= */

  function normalizeText(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  /* =========================================================
     FIND BEST ANSWER
  ========================================================= */

  function findAnswer(text) {
    const query = normalizeText(text);

    let bestMatch = null;
    let bestScore = 0;

    FAQS.forEach((faq) => {
      let score = 0;

      faq.keywords.forEach((keyword) => {
        const normalizedKeyword = normalizeText(keyword);

        if (query.includes(normalizedKeyword)) {
          /*
            Longer keyword matches get a higher score.
            Example:
            "aoi stage 1" > "aoi"
          */
          score += normalizedKeyword.length;
        }
      });

      if (score > bestScore) {
        bestScore = score;
        bestMatch = faq;
      }
    });

    if (bestMatch) {
      return bestMatch.answer;
    }

    return FALLBACKS[
      Math.floor(Math.random() * FALLBACKS.length)
    ];
  }

  /* =========================================================
     CREATE CHAT BUBBLE
  ========================================================= */

  const bubble = document.createElement("button");

  bubble.className = "chat-bubble";
  bubble.type = "button";
  bubble.setAttribute("aria-label", "Open Team Assistant");

  bubble.innerHTML = `
    <span class="chat-icon">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 5h16v11H9l-5 4V5z"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linejoin="round"
        />
        <path
          d="M8 9h8M8 12h5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </span>

    <span class="chat-bubble-label">
      Ask
    </span>
  `;

  /* =========================================================
     CREATE CHAT PANEL
  ========================================================= */

  const panel = document.createElement("div");

  panel.className = "chat-panel";

  panel.innerHTML = `
    <div class="chat-head">

      <div class="chat-head-info">
        <div class="chat-avatar">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 3v3M12 18v3M3 12h3M18 12h3"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
            />
            <circle
              cx="12"
              cy="12"
              r="5"
              stroke="currentColor"
              stroke-width="1.6"
            />
          </svg>
        </div>

        <div>
          <div class="chat-head-title">
            ${CONFIG.botName}
          </div>

          <div class="chat-status">
            <span class="status-dot"></span>
            Online
          </div>
        </div>
      </div>

      <button
        class="chat-close"
        type="button"
        aria-label="Close chat"
      >
        ✕
      </button>

    </div>

    <div
      class="chat-messages"
      id="chatMessages"
      role="log"
      aria-live="polite"
    >

      <div class="chat-msg bot">
        <div class="bot-avatar">AI</div>

        <div class="message-content">
          Hey! 👋<br><br>
          I'm your Team Assistant. Ask me anything about
          <strong>SMT, SPI, AOI, the process or training.</strong>
        </div>
      </div>

    </div>

    <div class="chat-suggestions">

      <button
        class="chat-chip"
        type="button"
        data-q="What is SMT?"
      >
        What is SMT?
      </button>

      <button
        class="chat-chip"
        type="button"
        data-q="What is SPI?"
      >
        What is SPI?
      </button>

      <button
        class="chat-chip"
        type="button"
        data-q="What is AOI?"
      >
        What is AOI?
      </button>

      <button
        class="chat-chip"
        type="button"
        data-q="What is the process flow?"
      >
        Process Flow
      </button>

    </div>

    <div class="chat-input-row">

      <input
        type="text"
        id="chatInput"
        maxlength="${CONFIG.maxMessageLength}"
        placeholder="Ask a question..."
        autocomplete="off"
        aria-label="Type your question"
      />

      <button
        class="chat-send"
        id="chatSend"
        type="button"
        aria-label="Send message"
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M4 12h15M13 6l6 6-6 6"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

    </div>

    <div class="chat-footer">
      Team FAQ Assistant
    </div>
  `;

  document.body.appendChild(bubble);
  document.body.appendChild(panel);

  /* =========================================================
     ELEMENTS
  ========================================================= */

  const messages = panel.querySelector("#chatMessages");
  const input = panel.querySelector("#chatInput");
  const send = panel.querySelector("#chatSend");
  const close = panel.querySelector(".chat-close");

  /* =========================================================
     ADD MESSAGE
  ========================================================= */

  function addMessage(text, from) {
    const wrapper = document.createElement("div");

    wrapper.className = `chat-msg ${from}`;

    if (from === "bot") {
      wrapper.innerHTML = `
        <div class="bot-avatar">AI</div>

        <div class="message-content"></div>
      `;

      wrapper.querySelector(".message-content").textContent = text;
    } else {
      wrapper.innerHTML = `
        <div class="message-content"></div>
      `;

      wrapper.querySelector(".message-content").textContent = text;
    }

    messages.appendChild(wrapper);

    messages.scrollTop = messages.scrollHeight;
  }

  /* =========================================================
     TYPING INDICATOR
  ========================================================= */

  function showTyping() {
    const typing = document.createElement("div");

    typing.className = "chat-msg bot typing-message";

    typing.innerHTML = `
      <div class="bot-avatar">AI</div>

      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;

    messages.appendChild(typing);

    messages.scrollTop = messages.scrollHeight;

    return typing;
  }

  /* =========================================================
     ASK QUESTION
  ========================================================= */

  function ask(text) {
    const question = text.trim();

    if (!question) return;

    if (question.length > CONFIG.maxMessageLength) {
      addMessage(
        `Please keep your question under ${CONFIG.maxMessageLength} characters.`,
        "bot"
      );
      return;
    }

    addMessage(question, "user");

    input.value = "";

    const typing = showTyping();

    setTimeout(() => {
      typing.remove();

      const answer = findAnswer(question);

      addMessage(answer, "bot");
    }, CONFIG.typingDelay);
  }

  /* =========================================================
     OPEN / CLOSE
  ========================================================= */

  function openChat() {
    panel.classList.add("open");

    setTimeout(() => {
      input.focus();
    }, 150);
  }

  function closeChat() {
    panel.classList.remove("open");
  }

  function toggleChat() {
    if (panel.classList.contains("open")) {
      closeChat();
    } else {
      openChat();
    }
  }

  bubble.addEventListener("click", toggleChat);

  close.addEventListener("click", closeChat);

  /* =========================================================
     SEND MESSAGE
  ========================================================= */

  send.addEventListener("click", () => {
    ask(input.value);
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      ask(input.value);
    }

    if (event.key === "Escape") {
      closeChat();
    }
  });

  /* =========================================================
     SUGGESTIONS
  ========================================================= */

  panel.querySelectorAll(".chat-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      ask(chip.dataset.q);
    });
  });

  /* =========================================================
     CLOSE WITH ESCAPE
  ========================================================= */

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      panel.classList.contains("open")
    ) {
      closeChat();
    }
  });

})();
