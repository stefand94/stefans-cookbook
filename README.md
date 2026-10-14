# Stefan's Cookbook

A small static recipe site, hosted on GitHub Pages:
**https://stefand94.github.io/stefans-cookbook/**

- Collapsible sections: Starters, Soups, Mains, Sides, Sauces, Marinades, Desserts
- Each recipe has a servings control that rescales every ingredient
- Method and an estimated kcal per serving on every recipe
- Search box, and shareable links to a single recipe (e.g. `…/stefans-cookbook/#nuoc-cham`)

No build step: it's plain `index.html`, `styles.css`, `app.js` and `recipes.js`.

## Adding or editing a recipe

All recipes live in [`recipes.js`](recipes.js). Copy an existing recipe into the right section's `recipes` list and change it:

```js
{
  id: "my-new-recipe",            // used in the shareable link, lowercase-with-dashes
  name: "My New Recipe",
  servings: 4,                    // how many people the quantities below are for
  kcal: 350,                      // per serving (or a range: [300, 400])
  kcalNote: "optional extra detail",
  blurb: "optional one-liner shown above the recipe",
  yield: { qty: 200, unit: "ml" }, // optional, e.g. for sauces ("Makes about 200ml")
  ingredients: [
    { item: "Chicken thighs", qty: 600, unit: "g" },
    { item: "Garlic, grated", qty: 3, unit: "clove" },
    { item: "Red chilli", qty: [1, 2] },                       // a range
    { item: "Lemongrass", qty: 1, unit: "stalk", also: { qty: 20, unit: "g" } }, // shows "1 stalk (~20g)"
    { item: "Salt & pepper", text: "to taste" },               // never scales
  ],
  method: ["Step one.", "Step two."],
  notes: [{ label: "Tip", text: "Optional notes shown under the method." }],
}
```

Units that scale nicely: `g`, `ml` (switch to kg / litres over 1000), `tsp`, `tbsp`, `cup` (shown as fractions, stepping down to a smaller spoon for small amounts), and count words like `clove`, `stalk`, `lemon`, `lime`, `tin`. Leave `unit` out for plain counts ("2 carrots" → `{ item: "Carrots", qty: 2 }`).

## Previewing locally

```bash
python3 -m http.server 8123
```

Then open http://localhost:8123.

## Publishing

Push to `main` and GitHub Pages redeploys automatically within a minute or two.
