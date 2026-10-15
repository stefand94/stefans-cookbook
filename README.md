# Stefan's Cookbook

A small static recipe site, hosted on GitHub Pages:
**https://stefand94.github.io/stefans-cookbook/**

- Collapsible sections: Starters, Soups, Mains, Sides, Sauces & Marinades, Desserts
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
  uses: ["Sauce", "Marinade"],    // optional tags shown next to the name
  servings: 4,                    // how many people the quantities below are for
  kcal: 350,                      // per serving (or a range: [300, 400])
  kcalNote: "optional extra detail",
  blurb: "optional one-liner shown above the recipe",
  yield: { qty: 200, unit: "ml" }, // optional, e.g. for sauces ("Makes about 200ml")
  ingredients: [
    { item: "Chicken thighs", qty: 600, unit: "g" },
    { item: "Garlic, grated", qty: 3, unit: "clove" },
    { item: "Red chilli", qty: [1, 2] },                       // a range
    { item: "Lemongrass", qty: 20, unit: "g", also: { qty: 1, unit: "stalk" } }, // shows "20g (1 stalk)"
    { item: "Salt & pepper", text: "to taste" },               // never scales
    { group: "For the dressing" },                             // sub-heading; rows below belong to it
  ],
  method: ["Step one.", "Step two."],
  notes: [{ label: "Tip", text: "Optional notes shown under the method." }],
  serveWith: { title: "Ways to serve it", items: ["Lettuce cups"] }, // optional list
  diagram: { title: "How to fold it", steps: ["Step one.", "Step two."], svg: `<svg …>` }, // optional picture
}
```

Use metric for every amount: `g` or `ml` (they switch to kg / litres over 1000). For whole items, either use a count word as the unit (`clove`, `stalk`, `sprig`…) or give the weight and add the count with `also`, e.g. `{ item: "Onion", qty: 150, unit: "g", also: { qty: 1, unit: "onion" } }` → "150g (1 onion)". Add `approx: true` inside `also` to show it with a "~". Leave `unit` out for plain counts (`{ item: "Bay leaves", qty: 2 }`).

For a `diagram`, write the SVG inline and style it with the `dg-*` classes in `styles.css` (see the feta cigars recipe) so it follows light and dark mode. The `steps` are shown as numbered captions under the picture.

To link to another recipe from any text (blurb, ingredient, method step, note), write its id in double square brackets: `[[nuoc-cham]]` shows that recipe's name, `[[nuoc-cham|Nuoc Cham]]` shows your own label. Clicking it opens and scrolls to that recipe.

## Previewing locally

```bash
python3 -m http.server 8123
```

Then open http://localhost:8123.

## Publishing

Push to `main` and GitHub Pages redeploys automatically within a minute or two.
