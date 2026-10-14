(function () {
  "use strict";

  const book = window.COOKBOOK;
  const servingsState = {}; // recipe id -> current servings

  // ---------- Quantity formatting ----------

  const FRACTIONS = { 0.125: "⅛", 0.25: "¼", 0.333: "⅓", 0.5: "½", 0.667: "⅔", 0.75: "¾" };
  const SPOON_UNITS = new Set(["tsp", "tbsp", "cup"]);
  const PLURALS = {
    clove: "cloves", stalk: "stalks", lemon: "lemons", lime: "limes", breast: "breasts",
    tin: "tins", cup: "cups", "small bunch": "small bunches", sprig: "sprigs",
  };

  function nearest(value, steps) {
    let best = steps[0];
    for (const s of steps) if (Math.abs(s - value) < Math.abs(best - value)) best = s;
    return best;
  }

  // Express a number as "1½", "¾", "2" etc., snapping to cook-friendly fractions.
  function fraction(n, allowThirds, allowEighths) {
    const whole = Math.floor(n);
    const parts = [0, 0.25, 0.5, 0.75, 1];
    if (allowThirds) parts.push(0.333, 0.667);
    if (allowEighths && whole === 0) parts.push(0.125);
    let frac = nearest(n - whole, parts);
    let w = whole;
    if (frac === 1) { w += 1; frac = 0; }
    if (w === 0 && frac === 0) frac = allowEighths ? 0.125 : 0.25;
    const f = frac ? FRACTIONS[frac] : "";
    return (w ? String(w) : "") + f;
  }

  function roundMetric(n) {
    if (n < 10) return Math.round(n * 2) / 2;
    if (n < 20) return Math.round(n);
    if (n < 100) return Math.round(n / 5) * 5;
    if (n < 1000) return Math.round(n / 10) * 10;
    return Math.round(n / 50) * 50;
  }

  // Returns { num: "1½", unit: "tbsp" } for one value.
  function formatOne(n, unit) {
    if (unit === "g" || unit === "ml") {
      const r = roundMetric(n);
      if (r >= 1000) {
        const big = Math.round((r / 1000) * 100) / 100;
        return { num: String(big), unit: unit === "g" ? "kg" : big === 1 ? "litre" : "litres" };
      }
      return { num: String(r), unit };
    }
    // Step down to a smaller spoon when the amount gets fiddly.
    if (unit === "cup" && n < 0.25) return formatOne(n * 16, "tbsp");
    if (unit === "tbsp" && n < 1) return formatOne(n * 3, "tsp");
    if (unit === "tsp" && n < 0.1) return { num: "a pinch", unit: "" };
    if (SPOON_UNITS.has(unit)) return { num: fraction(n, unit === "cup", true), unit };
    // Countable things (cloves, onions, lemons…): whole numbers once there are a few.
    if (n >= 2) return { num: String(Math.round(n)), unit };
    if (n >= 1) return { num: fraction(Math.round(n * 2) / 2, false, false), unit };
    return { num: fraction(n, false, true), unit };
  }

  function unitLabel(unit, value) {
    if (!unit) return "";
    if (unit === "g" || unit === "ml" || unit === "kg") return unit;
    return value > 1 && PLURALS[unit] ? PLURALS[unit] : unit;
  }

  function formatQty(qty, unit, factor) {
    const glue = (u) => (u === "g" || u === "ml" || u === "kg" ? "" : " ");
    if (Array.isArray(qty)) {
      const lo = formatOne(qty[0] * factor, unit);
      const hi = formatOne(qty[1] * factor, unit);
      const u = unitLabel(hi.unit, qty[1] * factor);
      if (lo.num === hi.num && lo.unit === hi.unit) return hi.num + (u ? glue(u) + u : "");
      if (lo.unit !== hi.unit) {
        const lu = unitLabel(lo.unit, qty[0] * factor);
        return `${lo.num}${lu ? glue(lu) + lu : ""}–${hi.num}${u ? glue(u) + u : ""}`;
      }
      return `${lo.num}–${hi.num}${u ? glue(u) + u : ""}`;
    }
    const one = formatOne(qty * factor, unit);
    const u = unitLabel(one.unit, qty * factor);
    return one.num + (u ? glue(u) + u : "");
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

  function renderIngredients(recipe, tbody) {
    const factor = servingsState[recipe.id] / recipe.servings;
    tbody.replaceChildren(
      ...recipe.ingredients.map((ing) => {
        let amount = ing.text != null ? ing.text : formatQty(ing.qty, ing.unit, factor);
        if (ing.also) {
          const approx = ing.also.unit === "g" || ing.also.unit === "ml" ? "~" : "";
          amount += ` (${approx}${formatQty(ing.also.qty, ing.also.unit, factor)})`;
        }
        return el("tr", {}, el("td", { class: "amount" }, amount), el("td", {}, ing.item));
      })
    );
  }

  function renderRecipe(recipe) {
    servingsState[recipe.id] = recipe.servings;

    const tbody = el("tbody");
    const count = el("output", { class: "count", "aria-live": "polite" }, String(recipe.servings));
    const yieldEl = recipe.yield ? el("span", { class: "yield" }) : null;

    const update = () => {
      const n = servingsState[recipe.id];
      count.textContent = n;
      renderIngredients(recipe, tbody);
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
      yieldEl
    );

    const details = el(
      "details", { class: "recipe", id: recipe.id },
      el("summary", {},
        el("span", { class: "recipe-name" }, recipe.name),
        el("span", { class: "kcal-chip" }, `${formatKcal(recipe.kcal)} kcal`)
      ),
      el("div", { class: "recipe-body" },
        recipe.blurb ? el("p", { class: "blurb" }, recipe.blurb) : null,
        scaler,
        el("div", { class: "columns" },
          el("div", {},
            el("h4", {}, "Ingredients"),
            el("table", { class: "ingredients" }, tbody)
          ),
          el("div", {},
            el("h4", {}, "Method"),
            el("ol", { class: "method" }, recipe.method.map((s) => el("li", {}, s)))
          )
        ),
        el("p", { class: "kcal" },
          el("strong", {}, `${formatKcal(recipe.kcal)} kcal per serving`),
          recipe.kcalNote ? ` · ${recipe.kcalNote}` : ""
        ),
        (recipe.notes || []).map((n) => el("p", { class: "note" }, el("strong", {}, n.label + ": "), n.text)),
        recipe.serveWith
          ? el("div", { class: "serve-with" },
              el("h4", {}, recipe.serveWith.title),
              el("ul", {}, recipe.serveWith.items.map((i) => el("li", {}, i))))
          : null
      )
    );

    details.addEventListener("toggle", () => {
      if (details.open) history.replaceState(null, "", "#" + recipe.id);
    });

    update();
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
          ? el("ul", { class: "ideas" }, section.ideas.map((i) => el("li", {}, el("strong", {}, i.name), " ", i.text)))
          : null,
        !count && !section.ideas ? el("p", { class: "empty" }, "No recipes here yet.") : null
      )
    );
  }

  // ---------- Search ----------

  function applySearch(term) {
    const q = term.trim().toLowerCase();
    document.querySelectorAll(".section").forEach((sec) => {
      let anyMatch = false;
      sec.querySelectorAll(".recipe, .ideas li").forEach((item) => {
        const match = !q || item.textContent.toLowerCase().includes(q);
        item.hidden = !match;
        anyMatch = anyMatch || match;
      });
      sec.hidden = q && !anyMatch;
      if (q && anyMatch) sec.open = true;
    });
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

  let allOpen = false;
  const toggleAll = document.getElementById("toggle-all");
  toggleAll.addEventListener("click", () => {
    allOpen = !allOpen;
    document.querySelectorAll("details").forEach((d) => (d.open = allOpen));
    toggleAll.textContent = allOpen ? "Collapse all" : "Expand all";
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
