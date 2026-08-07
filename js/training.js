(function () {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;

  const icons = {
    ppt: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="13" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M7 9h5M7 12.5h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
    image: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="16" rx="1.5" stroke="currentColor" stroke-width="1.6"/><circle cx="8.5" cy="9.5" r="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M21 16l-5.5-5.5a1.5 1.5 0 00-2.1 0L4 19" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  };

  TRAINING_RESOURCES.forEach((res, i) => {
    const card = document.createElement("div");
    card.className = "gallery-card";
    card.innerHTML = `
      <div class="gallery-thumb ${res.type}">
        ${icons[res.type]}
      </div>
      <div class="gallery-body">
        <span class="gallery-idx">${String(i + 1).padStart(2, "0")}</span>
        <h4>${res.title}</h4>
        <span class="gallery-type">${res.type === "ppt" ? "Training Module" : "Reference image"}</span>
        <a href="${res.file}" target="_blank" class="gallery-action" data-status="pending">Checking…</a>
      </div>
    `;
    grid.appendChild(card);

    const actionEl = card.querySelector(".gallery-action");
    fetch(res.file, { method: "HEAD", cache: "no-store" })
      .then((r) => {
        if (r.ok) {
          actionEl.textContent = res.type === "ppt" ? "View Doc →" : "View image →";
          actionEl.dataset.status = "ready";
        } else {
          throw new Error("not found");
        }
      })
      .catch(() => {
        actionEl.textContent = "Awaiting upload";
        actionEl.dataset.status = "missing";
        actionEl.removeAttribute("href");
      });
  });
})();
