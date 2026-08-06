/* ============================================================
   BHARAT FIH — Internal FAQ chatbot
   ------------------------------------------------------------
   Simple, fully client-side keyword matcher. No external calls,
   no API key, works on GitHub Pages for free. Edit the FAQS
   array below to add or correct answers.
   ============================================================ */
(function () {
  const teamList = (typeof TEAM_MEMBERS !== "undefined")
    ? TEAM_MEMBERS.map((m) => `${m.name} (${m.role})`).join(", ")
    : "the team list isn't loaded on this page";

  const pptList = (typeof TRAINING_RESOURCES !== "undefined")
    ? TRAINING_RESOURCES.filter((r) => r.type === "ppt").map((r) => r.title).join(", ")
    : "LASER, SPP, SPI, NXT – Component Mounting, PRE AOI, POST AOI, VI MATERIAL, Holly AOI Training Guideline RGB";

  const FAQS = [
    {
      keywords: ["smt", "surface mount"],
      answer: "SMT (Surface Mount Technology) is the process of soldering electronic components directly onto the surface of a PCB. Our team sits inside the SMT line as the quality checkpoint."
    },
    {
      keywords: ["spi", "solder paste"],
      answer: "SPI = Solder Paste Inspection. It runs right after stencil printing and checks paste volume, height, and alignment on every pad — the earliest quality gate on the line."
    },
    {
      keywords: ["aoi stage 1", "aoi 1", "stage 1"],
      answer: "AOI Stage 1 runs right after reflow soldering. It scans every board for missing, shifted, or misaligned components."
    },
    {
      keywords: ["aoi stage 2", "aoi 2", "stage 2", "final inspection"],
      answer: "AOI Stage 2 is the final optical check, done after any rework, before a board is cleared to move downstream."
    },
    {
      keywords: ["aoi"],
      answer: "AOI = Automatic Optical Inspection. We run it in two stages: Stage 1 right after reflow, and Stage 2 as the final check after rework."
    },
    {
      keywords: ["team", "member", "who is on", "who's on"],
      answer: `The team: ${teamList}.`
    },
    {
      keywords: ["lead", "manager", "in charge"],
      answer: "Saravanan V is the Team Lead for SPI & AOI."
    },
    {
      keywords: ["ppt", "training deck", "slides", "presentation"],
      answer: `Training decks available: ${pptList}. Open the Training page from the top nav to view or download them.`
    },
    {
      keywords: ["image", "gallery", "photo"],
      answer: "Reference images sit at the end of the Training gallery, right after the PPTs. Open the Training page from the top nav."
    },
    {
      keywords: ["login", "password", "sign in", "credentials", "forgot"],
      answer: "Each team member has their own username and password. If you've forgotten yours, ask your team lead — credentials are managed in js/members.js."
    },
    {
      keywords: ["process", "flow", "steps", "how does it work"],
      answer: "The line runs: Paste Printing → SPI → Component Placement → Reflow → AOI Stage 1 → AOI Stage 2. Our team owns SPI, AOI Stage 1, and AOI Stage 2. See the Process section on the home page for the full walkthrough."
    },
    {
      keywords: ["hello", "hi", "hey"],
      answer: "Hey! Ask me about SMT, SPI, AOI, the team, or where to find the training decks."
    }
  ];

  const FALLBACK = "I don't have a built-in answer for that yet — ask your team lead, or check the Process and Training sections on the site.";

  function findAnswer(text) {
    const q = text.toLowerCase();
    for (const item of FAQS) {
      if (item.keywords.some((k) => q.includes(k))) return item.answer;
    }
    return FALLBACK;
  }

  // ---- Build the widget ----
  const bubble = document.createElement("button");
  bubble.className = "chat-bubble";
  bubble.setAttribute("aria-label", "Open team FAQ chat");
  bubble.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 5h16v11H8l-4 4V5z" stroke="white" stroke-width="1.7" stroke-linejoin="round"/></svg>`;

  const panel = document.createElement("div");
  panel.className = "chat-panel";
  panel.innerHTML = `
    <div class="chat-head">
      <div class="chat-head-title"><span class="dot"></span><span>Team FAQ</span></div>
      <button class="chat-close" aria-label="Close chat">✕</button>
    </div>
    <div class="chat-messages" id="chatMessages">
      <div class="chat-msg bot">Hey — ask me anything about SMT, SPI, AOI, the team, or where to find the training decks.</div>
    </div>
    <div class="chat-suggestions">
      <button class="chat-chip" data-q="What is SPI?">What is SPI?</button>
      <button class="chat-chip" data-q="What is AOI?">What is AOI?</button>
      <button class="chat-chip" data-q="Who is on the team?">Who's on the team?</button>
    </div>
    <div class="chat-input-row">
      <input type="text" id="chatInput" placeholder="Type a question…">
      <button class="chat-send" id="chatSend" aria-label="Send">→</button>
    </div>
  `;

  document.body.appendChild(bubble);
  document.body.appendChild(panel);

  const messages = panel.querySelector("#chatMessages");
  const input = panel.querySelector("#chatInput");
  const send = panel.querySelector("#chatSend");

  function addMessage(text, from) {
    const el = document.createElement("div");
    el.className = "chat-msg " + from;
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }

  function ask(text) {
    if (!text.trim()) return;
    addMessage(text, "user");
    input.value = "";
    setTimeout(() => addMessage(findAnswer(text), "bot"), 250);
  }

  bubble.addEventListener("click", () => panel.classList.toggle("open"));
  panel.querySelector(".chat-close").addEventListener("click", () => panel.classList.remove("open"));
  send.addEventListener("click", () => ask(input.value));
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") ask(input.value); });
  panel.querySelectorAll(".chat-chip").forEach((chip) => {
    chip.addEventListener("click", () => ask(chip.dataset.q));
  });
})();
