(function () {
  const grid = document.getElementById("memberSelect");
  const usernameField = document.getElementById("usernameField");
  const passwordField = document.getElementById("passwordField");
  const form = document.getElementById("loginForm");
  const errorBox = document.getElementById("loginError");
  let selected = null;

  // Build the member picker
  TEAM_MEMBERS.forEach((m) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "member-pill";
    btn.dataset.id = m.id;
    btn.innerHTML = `
      <span class="mini-avatar" style="background:${m.accent}">${m.initials}</span>
      <span>${m.name}</span>
    `;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".member-pill").forEach((p) => p.classList.remove("selected"));
      btn.classList.add("selected");
      selected = m;
      usernameField.value = m.username;
      passwordField.value = "";
      passwordField.focus();
      errorBox.style.display = "none";
    });
    grid.appendChild(btn);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = TEAM_MEMBERS.find(
      (m) => m.username.toLowerCase() === usernameField.value.trim().toLowerCase()
    );

    if (!user || passwordField.value !== user.password) {
      errorBox.textContent = "That username/password combination doesn't match our records. Pick your name above and try again.";
      errorBox.style.display = "block";
      return;
    }

    localStorage.setItem("bfih_current_user", user.id);
    window.location.href = "portfolio.html";
  });
})();
