(function () {
  const data = window.PORTFOLIO;
  const FR = window.PORTFOLIO_FR || { projects: {}, categories: {}, links: {}, hardware: {} };
  const $ = (sel) => document.querySelector(sel);
  const root = document.documentElement;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const isExternal = (url) => /^https?:/.test(url);
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* private mode: ignore */ } },
  };

  let lang = root.lang === "fr" ? "fr" : "en";

  // French typography: non-breaking space before : ; ! ? (not inside URLs or "E[φ U ψ]")
  const frTypo = (s) => s.replace(/ ([:;!?])(?=\s|$)/g, "\u00a0$1");
  const T = (en, fr) => (lang === "fr" && fr != null ? (typeof fr === "string" ? frTypo(fr) : fr) : en);
  const ui = (key) => (lang === "fr" ? window.I18N_FR : window.I18N_EN_UI)[key];

  // Localised view of a project
  const view = (p) => {
    const f = (FR.projects && FR.projects[p.id]) || {};
    return {
      ...p,
      title: T(p.title, f.title),
      subtitle: T(p.subtitle, f.subtitle),
      context: T(p.context, f.context),
      summary: T(p.summary, f.summary),
      highlights: lang === "fr" && f.highlights ? f.highlights.map(frTypo) : p.highlights,
      tech: lang === "fr" && f.tech ? f.tech : p.tech,
      links: (p.links || []).map((l) => ({ ...l, label: T(l.label, FR.links && FR.links[l.label]) })),
    };
  };

  const tags = (list) => `<ul class="tags">${list.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
  const links = (list) =>
    list.length
      ? `<div class="links">${list
          .map((l, i) => `<a class="btn small${i === 0 ? " primary" : ""}" href="${esc(l.url)}"${isExternal(l.url) ? ' target="_blank" rel="noopener"' : ""}>${esc(l.label)}</a>`)
          .join("")}</div>`
      : "";
  const meta = (p) => [p.year, p.context].filter(Boolean).map(esc).join(" · ");

  // ------------------------------------------------------------ static text
  // English lives in the HTML; remember it so we can switch back.
  const i18nNodes = [...document.querySelectorAll("[data-i18n]")];
  i18nNodes.forEach((el) => { el.dataset.en = el.innerHTML; });

  function applyStaticText() {
    i18nNodes.forEach((el) => {
      const fr = window.I18N_FR[el.dataset.i18n];
      el.innerHTML = lang === "fr" && fr ? fr : el.dataset.en;
    });
    $("#status").textContent = T(data.status, FR.status);
    $("#filters").setAttribute("aria-label", ui("ui.filter"));
    const lb = $("#lang-toggle");
    lb.textContent = ui("ui.langBtn");
    lb.setAttribute("aria-label", ui("ui.langLabel"));
    lb.title = lang === "fr" ? "English" : "Français";
    document.title = lang === "fr" ? "John-Michael Jeny Jeyaraj · Portfolio" : "John-Michael Jeny Jeyaraj · Portfolio";
  }

  // ---------------------------------------------------------------- featured
  function renderFeatured() {
    $("#featured").innerHTML = data.projects
      .filter((p) => p.featured)
      .map(view)
      .map(
        (p) => `
        <article class="feature${p.tall ? " tall" : ""}">
          <div class="feature-media">${p.tall && p.links.length
            ? `<a href="${esc(p.links[0].url)}" target="_blank" rel="noopener" title="${esc(p.links[0].label)}"><img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy"></a>`
            : `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" width="1200" height="700">`}</div>
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
  }

  // -------------------------------------------------------- grid + filters
  const grid = $("#grid");
  const filters = $("#filters");
  let currentCat = "all";

  function applyFilter() {
    grid.querySelectorAll(".card").forEach((card) => {
      // Featured projects already appear above, so they only show here when a filter is active.
      card.hidden = currentCat === "all"
        ? card.dataset.featured === "true"
        : !card.dataset.cats.split(" ").includes(currentCat);
    });
  }

  function renderGrid() {
    grid.innerHTML = data.projects
      .map(view)
      .map(
        (p) => `
        <button class="card" data-id="${esc(p.id)}" data-cats="${esc(p.categories.join(" "))}" data-featured="${!!p.featured}" aria-haspopup="dialog">
          ${p.image
            ? `<div class="card-media${p.tall ? " top" : ""}"><img src="${esc(p.image)}" alt="" loading="lazy"></div>`
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

    filters.innerHTML = data.categories
      .map((c) => `<button role="tab" aria-selected="${c.id === currentCat}" data-cat="${c.id}">${esc(T(c.label, FR.categories && FR.categories[c.id]))}</button>`)
      .join("");
    applyFilter();
  }

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    currentCat = btn.dataset.cat;
    filters.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", b === btn));
    applyFilter();
  });

  // ------------------------------------------------------------------ dialog
  const dialog = $("#project-dialog");
  let openId = null;
  function fillDialog(id) {
    const raw = data.projects.find((x) => x.id === id);
    if (!raw) return false;
    const p = view(raw);
    $("#dlg-body").innerHTML = `
      ${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.title)}">` : ""}
      <div class="dlg-content">
        <span class="meta">${meta(p)}</span>
        <h3 id="dlg-title">${esc(p.title)}</h3>
        ${p.subtitle ? `<p class="sub">${esc(p.subtitle)}</p>` : ""}
        <p class="muted" style="margin:0">${esc(p.summary)}</p>
        ${p.highlights ? `<ul class="hl">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}</ul>` : ""}
        ${tags(p.tech)}
        ${links(p.links)}
      </div>`;
    dialog.querySelector(".close").setAttribute("aria-label", ui("ui.close"));
    return true;
  }
  const open = (id) => {
    if (!fillDialog(id)) return;
    openId = id;
    dialog.showModal();
    history.replaceState(null, "", location.search + "#" + id);
  };
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (card) open(card.dataset.id);
  });
  dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener("close", () => { openId = null; history.replaceState(null, "", location.pathname + location.search); });

  // ---------------------------------------------------------------- hardware
  const hwT = (s) => T(s, FR.hardware && FR.hardware[s]);
  function renderHardware() {
    const hw = [...data.hardware].sort((a, b) => b.available - a.available);
    $("#hardware-grid").innerHTML = hw
      .map(
        (h) => `
        <article class="hw${h.available ? "" : " sold"}">
          <img src="${esc(h.image)}" alt="${esc(h.name)}" loading="lazy">
          <div class="hw-body">
            <span class="badge ${h.available ? "ok" : "sold"}">${h.available ? `${ui("ui.available")} · ${esc(lang === "fr" ? h.price.replace(/^€(\d+)/, "$1\u00a0€") : h.price)}` : ui("ui.sold")}</span>
            <h3>${esc(h.name)}</h3>
            <ul>${h.specs.map((s) => `<li>${esc(hwT(s))}</li>`).join("")}</ul>
            ${h.condition ? `<span class="meta">${ui("ui.condition")}${lang === "fr" ? "\u00a0: " : ": "}${esc(hwT(h.condition))}</span>` : ""}
          </div>
        </article>`
      )
      .join("");
  }

  // ---------------------------------------------------------------- language
  function render() {
    root.lang = lang;
    applyStaticText();
    renderFeatured();
    renderGrid();
    renderHardware();
    if (openId) fillDialog(openId);
  }

  $("#lang-toggle").addEventListener("click", () => {
    lang = lang === "fr" ? "en" : "fr";
    store.set("lang", lang);
    const url = new URL(location.href);
    url.searchParams.delete("lang");
    history.replaceState(null, "", url);
    render();
    updateThemeButton();
  });

  // ------------------------------------------------------------------- theme
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const isDark = () => (root.dataset.theme ? root.dataset.theme === "dark" : prefersDark.matches);
  function updateThemeButton() {
    const b = $("#theme-toggle");
    const label = ui(isDark() ? "ui.themeLight" : "ui.themeDark");
    b.setAttribute("aria-label", label);
    b.title = label;
    b.setAttribute("aria-pressed", String(isDark()));
  }
  $("#theme-toggle").addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    store.set("theme", next);
    updateThemeButton();
  });
  prefersDark.addEventListener("change", updateThemeButton);

  // -------------------------------------------------------------------- init
  $("#year").textContent = new Date().getFullYear();
  render();
  updateThemeButton();
  if (location.hash.length > 1) open(location.hash.slice(1));
})();
