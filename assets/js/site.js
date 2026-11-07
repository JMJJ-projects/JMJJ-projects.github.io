(function () {
  const data = window.PORTFOLIO;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const isExternal = (url) => /^https?:/.test(url);

  $("#status").textContent = data.status;
  $("#year").textContent = new Date().getFullYear();

  const tags = (list) => `<ul class="tags">${list.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
  const links = (list, cls = "btn small") =>
    list.length
      ? `<div class="links">${list
          .map((l, i) => `<a class="${cls}${i === 0 ? " primary" : ""}" href="${esc(l.url)}"${isExternal(l.url) ? ' target="_blank" rel="noopener"' : ""}>${esc(l.label)}</a>`)
          .join("")}</div>`
      : "";
  const meta = (p) => [p.year, p.context].filter(Boolean).map(esc).join(" · ");

  // ---------------------------------------------------------------- featured
  $("#featured").innerHTML = data.projects
    .filter((p) => p.featured)
    .map(
      (p) => `
      <article class="feature">
        <div class="feature-media"><img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" width="1200" height="700"></div>
        <div class="feature-body">
          <span class="meta">${meta(p)}</span>
          <h3>${esc(p.title)}</h3>
          <p class="sub">${esc(p.subtitle)}</p>
          <p class="muted" style="margin:0">${esc(p.summary)}</p>
          <ul>${(p.highlights || []).map((h) => `<li>${esc(h)}</li>`).join("")}</ul>
          ${tags(p.tech)}
          ${links(p.links)}
        </div>
      </article>`
    )
    .join("");

  // -------------------------------------------------------------------- grid
  const grid = $("#grid");
  // Featured projects already appear above, so they only show here when a filter is active.
  grid.innerHTML = data.projects
    .map(
      (p) => `
      <button class="card" data-id="${esc(p.id)}" data-cats="${esc(p.categories.join(" "))}" data-featured="${!!p.featured}"${p.featured ? " hidden" : ""} aria-haspopup="dialog">
        ${p.image
          ? `<div class="card-media"><img src="${esc(p.image)}" alt="" loading="lazy"></div>`
          : `<div class="card-media placeholder"><span>${esc(p.subtitle || p.title)}</span></div>`}
        <div class="card-body">
          <span class="meta">${meta(p)}</span>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.summary)}</p>
          ${tags(p.tech.slice(0, 4))}
        </div>
      </button>`
    )
    .join("");

  // ----------------------------------------------------------------- filters
  const filters = $("#filters");
  filters.innerHTML = data.categories
    .map((c, i) => `<button role="tab" aria-selected="${i === 0}" data-cat="${c.id}">${esc(c.label)}</button>`)
    .join("");
  filters.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    filters.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", b === btn));
    const cat = btn.dataset.cat;
    grid.querySelectorAll(".card").forEach((card) => {
      card.hidden = cat === "all"
        ? card.dataset.featured === "true"
        : !card.dataset.cats.split(" ").includes(cat);
    });
  });

  // ------------------------------------------------------------------ dialog
  const dialog = $("#project-dialog");
  const open = (id) => {
    const p = data.projects.find((x) => x.id === id);
    if (!p) return;
    $("#dlg-body").innerHTML = `
      ${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)}">` : ""}
      <div class="dlg-content">
        <span class="meta">${meta(p)}</span>
        <h3 id="dlg-title">${esc(p.title)}</h3>
        ${p.subtitle ? `<p class="sub" style="margin:-6px 0 0;color:var(--accent);font-weight:500">${esc(p.subtitle)}</p>` : ""}
        <p class="muted" style="margin:0">${esc(p.summary)}</p>
        ${p.highlights ? `<ul class="hl">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
        ${tags(p.tech)}
        ${links(p.links)}
      </div>`;
    dialog.showModal();
    history.replaceState(null, "", "#" + id);
  };
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) open(card.dataset.id);
  });
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener("close", () => history.replaceState(null, "", location.pathname));
  if (location.hash.length > 1) open(location.hash.slice(1));

  // ---------------------------------------------------------------- hardware
  const hw = [...data.hardware].sort((a, b) => b.available - a.available);
  $("#hardware-grid").innerHTML = hw
    .map(
      (h) => `
      <article class="hw${h.available ? "" : " sold"}">
        <img src="${esc(h.image)}" alt="${esc(h.name)}" loading="lazy">
        <div class="hw-body">
          <span class="badge ${h.available ? "ok" : "sold"}">${h.available ? `Available · ${esc(h.price)}` : "Sold"}</span>
          <h3>${esc(h.name)}</h3>
          <ul>${h.specs.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
          ${h.condition ? `<span class="meta">Condition: ${esc(h.condition)}</span>` : ""}
        </div>
      </article>`
    )
    .join("");
})();
