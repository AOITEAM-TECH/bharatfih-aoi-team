(function () {
  const currentId = localStorage.getItem("bfih_current_user");
  const currentUser = TEAM_MEMBERS.find((m) => m.id === currentId);

  // Personalize the nav
  const navLabel = document.getElementById("navUserLabel");
  if (navLabel) {
    navLabel.textContent = currentUser ? `${currentUser.name} · ${currentUser.role}` : "Guest";
  }

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("bfih_current_user");
      window.location.href = "index.html";
    });
  }

  // Render team grid
  const grid = document.getElementById("teamGrid");
  if (grid) {
    TEAM_MEMBERS.forEach((m) => {
      const isYou = currentUser && currentUser.id === m.id;
      const card = document.createElement("div");
      card.className = "member-card" + (isYou ? " is-you" : "");
      card.innerHTML = `
        ${isYou ? '<span class="you-flag">YOU</span>' : ""}
        <div class="avatar" style="background:${m.accent}">${m.initials}</div>
        <h4>${m.name}</h4>
        <span class="role">${m.role}</span>
        <p class="desc">${m.blurb}</p>
      `;
      grid.appendChild(card);
    });
  }
})();
