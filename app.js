(function () {
  "use strict";

  const book = window.COOKBOOK;
  const servingsState = {}; // recipe id -> current servings

  // ---------- Quantity formatting ----------

  const FRACTIONS = { 0.25: "¼", 0.5: "½", 0.75: "¾" };
  const METRIC = new Set(["g", "ml", "kg", "litre", "litres"]);
  const PLURALS = { chilli: "chillies" };

  // Express a count as "1½", "¾", "2" etc.
  function fraction(n) {
    const whole = Math.floor(n);
    const steps = [0, 0.25, 0.5, 0.75, 1];
    let frac = steps.reduce((best, s) => (Math.abs(s - (n - whole)) < Math.abs(best - (n - whole)) ? s : best));
    let w = whole;
    if (frac === 1) { w += 1; frac = 0; }
    if (w === 0 && frac === 0) frac = 0.25;
    return (w ? String(w) : "") + (frac ? FRACTIONS[frac] : "");
  }

  function roundMetric(n) {
    if (n < 10) return Math.round(n * 2) / 2;
    if (n < 20) return Math.round(n);
    if (n < 100) return Math.round(n / 5) * 5;
    if (n < 1000) return Math.round(n / 10) * 10;
    return Math.round(n / 50) * 50;
  }

  // Returns { num, unit, value } for one amount. Units are g, ml, or a count word.
  function formatOne(n, unit) {
    if (unit === "g" || unit === "ml") {
      const r = roundMetric(n);
      if (r === 0) return { num: "a pinch", unit: "", value: 0 };
      if (r >= 1000) {
        const big = Math.round((r / 1000) * 100) / 100;
        return { num: String(big), unit: unit === "g" ? "kg" : big === 1 ? "litre" : "litres", value: big };
      }
      return { num: String(r), unit, value: r };
    }
    // Countable things (cloves, onions, lemons…): whole numbers once there are a few.
    if (n >= 5) return { num: String(Math.round(n)), unit, value: Math.round(n) };
    if (n >= 1) return { num: fraction(Math.round(n * 2) / 2), unit, value: n };
    return { num: fraction(n), unit, value: n };
  }

  function unitLabel(unit, value) {
    if (!unit || METRIC.has(unit) || value <= 1) return unit || "";
    if (PLURALS[unit]) return PLURALS[unit];
    return /(ch|sh|s)$/.test(unit) ? unit + "es" : unit + "s";
  }

  function formatQty(qty, unit, factor) {
    const glue = (u) => (u === "g" || u === "ml" || u === "kg" ? "" : " ");
    const label = (f) => {
      const u = unitLabel(f.unit, f.value);
      return u ? glue(u) + u : "";
    };
    if (Array.isArray(qty)) {
      const lo = formatOne(qty[0] * factor, unit);
      const hi = formatOne(qty[1] * factor, unit);
      if (lo.num === hi.num && lo.unit === hi.unit) return hi.num + label(hi);
      if (lo.unit !== hi.unit) return `${lo.num}${label(lo)}–${hi.num}${label(hi)}`;
      return `${lo.num}–${hi.num}${label(hi)}`;
    }
    const one = formatOne(qty * factor, unit);
    return one.num + label(one);
  }

  function formatKcal(kcal) {
    return Array.isArray(kcal) ? `~${kcal[0]}–${kcal[1]}` : `~${kcal}`;
  }

  // ---------- Rendering ----------

  const el = (tag, attrs = {}, ...children) => {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") node.className = v;
      else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
      node.append(c.nodeType ? c : document.createTextNode(c));
    }
    return node;
  };

  // Text can link to another recipe: [[nuoc-cham]] shows its name, [[nuoc-cham|the dip]] a custom label.
  const recipeNames = {};
  for (const section of book.sections) for (const r of section.recipes) recipeNames[r.id] = r.name;

  function rich(text) {
    const parts = [];
    let last = 0;
    for (const m of text.matchAll(/\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g)) {
      const [whole, id, label] = m;
      parts.push(text.slice(last, m.index));
      if (recipeNames[id]) {
        parts.push(el("a", {
          class: "xref", href: "#" + id,
          onclick: (e) => { e.preventDefault(); history.pushState(null, "", "#" + id); openFromHash(); },
        }, label || recipeNames[id]));
      } else {
        console.warn(`Unknown recipe link: ${whole}`);
        parts.push(label || id);
      }
      last = m.index + whole.length;
    }
    parts.push(text.slice(last));
    return parts;
  }

  // ---------- Kitchen mode ----------
  // Ticks survive a reload mid-cook (localStorage may be unavailable, e.g. private browsing).

  const cooking = new Set(); // ids of recipes in cook mode
  let wakeLock = null;

  function loadTicks(id) {
    try {
      const v = JSON.parse(localStorage.getItem("cook:" + id));
      if (v) return { on: true, ingredients: new Set(v.ingredients), steps: new Set(v.steps) };
    } catch (e) { /* ignore */ }
    return { on: false, ingredients: new Set(), steps: new Set() };
  }

  function saveTicks(id, ticks) {
    try {
      if (ticks.on) localStorage.setItem("cook:" + id, JSON.stringify({ ingredients: [...ticks.ingredients], steps: [...ticks.steps] }));
      else localStorage.removeItem("cook:" + id);
    } catch (e) { /* ignore */ }
  }

  // Keep the screen awake while anything is being cooked. The lock drops when the tab is hidden.
  async function syncWakeLock() {
    if (!("wakeLock" in navigator)) return;
    if (cooking.size && !wakeLock && document.visibilityState === "visible") {
      try {
        wakeLock = await navigator.wakeLock.request("screen");
        wakeLock.addEventListener("release", () => { wakeLock = null; });
      } catch (e) { /* denied or unsupported */ }
    } else if (!cooking.size && wakeLock) {
      wakeLock.release();
      wakeLock = null;
    }
  }
  document.addEventListener("visibilitychange", syncWakeLock);

  function renderIngredients(recipe, tbody) {
    const factor = servingsState[recipe.id] / recipe.servings;
    tbody.replaceChildren(
      ...recipe.ingredients.map((ing, i) => {
        // { group: "Ponzu" } starts a sub-heading; the rows after it belong to that part of the dish.
        if (ing.group) return el("tr", { class: "group" }, el("th", { colspan: "2", scope: "colgroup" }, ing.group));
        const amount = ing.text != null ? ing.text : formatQty(ing.qty, ing.unit, factor);
        let also = null;
        if (ing.also) {
          const approx = ing.also.approx || ing.also.unit === "g" || ing.also.unit === "ml" ? "~" : "";
          also = el("span", { class: "also" }, ` (${approx}${formatQty(ing.also.qty, ing.also.unit, factor)})`);
        }
        return el("tr", { "data-tick": "ingredients:" + i }, el("td", { class: "amount" }, amount, also), el("td", {}, rich(ing.item)));
      })
    );
  }

  // Step-by-step picture: inline SVG (from recipes.js, so trusted) plus numbered captions.
  function renderDiagram(diagram) {
    const art = el("div", { class: "diagram-art", role: "img", "aria-label": diagram.title });
    art.innerHTML = diagram.svg;
    return el("figure", { class: "diagram" },
      el("h4", {}, diagram.title),
      art,
      el("ol", { class: "diagram-steps" }, diagram.steps.map((s) => el("li", {}, rich(s))))
    );
  }

  function renderRecipe(recipe) {
    servingsState[recipe.id] = recipe.servings;

    const tbody = el("tbody");
    const count = el("output", { class: "count", "aria-live": "polite" }, String(recipe.servings));
    const yieldEl = recipe.yield ? el("span", { class: "yield" }) : null;

    const ticks = loadTicks(recipe.id);

    // Reflect cook mode and ticks onto the ingredient rows and method steps.
    const paint = () => {
      const on = ticks.on;
      const nodes = [...details.querySelectorAll("[data-tick]")];
      for (const node of nodes) {
        const [kind, i] = node.dataset.tick.split(":");
        const done = ticks[kind].has(Number(i));
        node.classList.toggle("done", on && done);
        node.classList.remove("current");
        if (on) {
          node.setAttribute("role", "checkbox");
          node.setAttribute("aria-checked", String(done));
          node.tabIndex = 0;
        } else {
          node.removeAttribute("role");
          node.removeAttribute("aria-checked");
          node.removeAttribute("tabindex");
        }
      }
      const current = on && nodes.find((n) => n.dataset.tick.startsWith("steps:") && !n.classList.contains("done"));
      if (current) current.classList.add("current");
    };

    const toggleTick = (node) => {
      const [kind, i] = node.dataset.tick.split(":");
      const set = ticks[kind];
      set.has(Number(i)) ? set.delete(Number(i)) : set.add(Number(i));
      saveTicks(recipe.id, ticks);
      paint();
    };

    const setCooking = (on) => {
      ticks.on = on;
      if (!on) { ticks.ingredients.clear(); ticks.steps.clear(); }
      details.classList.toggle("cooking", on);
      cookBtn.setAttribute("aria-pressed", String(on));
      cookBtn.textContent = on ? "Done cooking" : "Cook";
      resetTicks.hidden = !on;
      if (on) { details.open = true; cooking.add(recipe.id); } else cooking.delete(recipe.id);
      saveTicks(recipe.id, ticks);
      paint();
      syncWakeLock();
    };

    const cookBtn = el("button", { type: "button", class: "cook", "aria-pressed": "false", onclick: () => setCooking(!ticks.on) }, "Cook");
    const resetTicks = el("button", {
      type: "button", class: "reset", hidden: "",
      onclick: () => { ticks.ingredients.clear(); ticks.steps.clear(); saveTicks(recipe.id, ticks); paint(); },
    }, "reset ticks");

    const update = () => {
      const n = servingsState[recipe.id];
      count.textContent = n;
      renderIngredients(recipe, tbody);
      paint();
      if (yieldEl) {
        yieldEl.textContent = `Makes about ${formatQty(recipe.yield.qty, recipe.yield.unit, n / recipe.servings)}`;
      }
      reset.hidden = n === recipe.servings;
    };
    const change = (d) => {
      servingsState[recipe.id] = Math.min(40, Math.max(1, servingsState[recipe.id] + d));
      update();
    };
    const reset = el("button", { class: "reset", type: "button", onclick: () => { servingsState[recipe.id] = recipe.servings; update(); } }, "reset");

    const scaler = el(
      "div", { class: "scaler" },
      el("span", { class: "scaler-label" }, "Serves"),
      el("button", { type: "button", class: "step", "aria-label": "Fewer servings", onclick: () => change(-1) }, "−"),
      count,
      el("button", { type: "button", class: "step", "aria-label": "More servings", onclick: () => change(1) }, "+"),
      reset,
      yieldEl,
      el("span", { class: "cook-controls" }, resetTicks, cookBtn),
      "wakeLock" in navigator ? null : el("span", { class: "wake-note" }, "Your screen may still sleep on this device.")
    );

    const details = el(
      "details", { class: "recipe", id: recipe.id },
      el("summary", {},
        el("span", { class: "recipe-title" },
          el("span", { class: "recipe-name" }, recipe.name),
          (recipe.uses || []).map((u) => el("span", { class: "tag" }, u))
        ),
        el("span", { class: "kcal-chip" }, `${formatKcal(recipe.kcal)} kcal`)
      ),
      el("div", { class: "recipe-body" },
        recipe.blurb ? el("p", { class: "blurb" }, rich(recipe.blurb)) : null,
        scaler,
        el("div", { class: "columns" },
          el("div", {},
            el("h4", {}, "Ingredients"),
            el("table", { class: "ingredients" }, tbody)
          ),
          el("div", {},
            el("h4", {}, "Method"),
            el("ol", { class: "method" }, recipe.method.map((s, i) => el("li", { "data-tick": "steps:" + i }, rich(s))))
          )
        ),
        recipe.diagram ? renderDiagram(recipe.diagram) : null,
        el("p", { class: "kcal" },
          el("strong", {}, `${formatKcal(recipe.kcal)} kcal per serving`),
          recipe.kcalNote ? ` · ${recipe.kcalNote}` : ""
        ),
        (recipe.notes || []).map((n) => el("p", { class: "note" }, el("strong", {}, n.label + ": "), rich(n.text))),
        recipe.serveWith
          ? el("div", { class: "serve-with" },
              el("h4", {}, recipe.serveWith.title),
              el("ul", {}, recipe.serveWith.items.map((i) => el("li", {}, rich(i)))))
          : null
      )
    );

    details.addEventListener("toggle", () => {
      if (details.open) history.replaceState(null, "", "#" + recipe.id);
    });

    // In cook mode, tapping an ingredient or step ticks it off (links inside still work).
    details.addEventListener("click", (e) => {
      if (!ticks.on || e.target.closest("a, button")) return;
      const node = e.target.closest("[data-tick]");
      if (node) toggleTick(node);
    });
    details.addEventListener("keydown", (e) => {
      if (!ticks.on || (e.key !== "Enter" && e.key !== " ") || !e.target.matches("[data-tick]")) return;
      e.preventDefault();
      toggleTick(e.target);
    });

    update();
    if (ticks.on) setCooking(true);
    return details;
  }

  function renderSection(section) {
    const count = section.recipes.length;
    const meta = count ? `${count} recipe${count === 1 ? "" : "s"}` : section.ideas ? `${section.ideas.length} ideas` : "coming soon";
    return el(
      "details", { class: "section", id: "section-" + section.id, "data-section": section.id },
      el("summary", {}, el("h2", {}, section.name), el("span", { class: "section-meta" }, meta)),
      el("div", { class: "section-body" },
        section.blurb ? el("p", { class: "section-blurb" }, section.blurb) : null,
        section.recipes.map(renderRecipe),
        section.ideas
          ? el("ul", { class: "ideas" }, section.ideas.map((i) => el("li", {}, el("strong", {}, i.name), " ", rich(i.text))))
          : null,
        !count && !section.ideas ? el("p", { class: "empty" }, "No recipes here yet.") : null
      )
    );
  }

  // ---------- Search ----------

  function applySearch(term) {
    const q = term.trim().toLowerCase();
    let anyAtAll = false;
    document.querySelectorAll(".section").forEach((sec) => {
      let anyMatch = false;
      sec.querySelectorAll(".recipe, .ideas li").forEach((item) => {
        const match = !q || item.textContent.toLowerCase().includes(q);
        item.hidden = !match;
        anyMatch = anyMatch || match;
      });
      sec.hidden = q && !anyMatch;
      if (q && anyMatch) sec.open = true;
      anyAtAll = anyAtAll || anyMatch;
    });
    const empty = document.getElementById("no-results");
    empty.hidden = anyAtAll;
    empty.querySelector("p").textContent = `No recipes match “${term.trim()}”.`;
  }

  // ---------- Boot ----------

  document.title = book.title;
  document.getElementById("title").textContent = book.title;
  document.getElementById("intro").textContent = book.intro;

  const main = document.getElementById("book");
  main.replaceChildren(...book.sections.map(renderSection));

  document.getElementById("toc").replaceChildren(
    ...book.sections.map((s) =>
      el("a", { href: "#section-" + s.id, onclick: () => { document.getElementById("section-" + s.id).open = true; } }, s.name)
    )
  );

  document.getElementById("search").addEventListener("input", (e) => applySearch(e.target.value));


  const search = document.getElementById("search");
  document.getElementById("clear-search").addEventListener("click", () => {
    search.value = "";
    applySearch("");
    search.focus();
  });

  // Expand shows every section's recipe list; the recipes themselves stay closed.
  document.getElementById("expand-all").addEventListener("click", () => {
    document.querySelectorAll(".section").forEach((d) => (d.open = true));
  });
  document.getElementById("collapse-all").addEventListener("click", () => {
    document.querySelectorAll("details").forEach((d) => (d.open = false));
  });

  // Open a recipe or section from a shared link, e.g. …/#nuoc-cham
  function openFromHash() {
    const id = decodeURIComponent(location.hash.slice(1));
    const target = id && document.getElementById(id);
    if (!target) return;
    let node = target;
    while (node) {
      if (node.tagName === "DETAILS") node.open = true;
      node = node.parentElement;
    }
    target.scrollIntoView({ block: "start" });
  }
  window.addEventListener("hashchange", openFromHash);
  openFromHash();
})();
