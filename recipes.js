/*
  Stefan's Cookbook — recipe data
  ================================
  Every recipe lives in this file. To add one, copy an existing recipe into the
  right section's `recipes` list and edit it. See README.md for the field reference.

  All amounts are in g or ml, or a count for whole items (cloves, chillies…):
    { item: "Garlic, grated", qty: 2, unit: "clove" }                      → 2 cloves, 4 cloves…
    { item: "Onion, diced", qty: 150, unit: "g", also: { qty: 1, unit: "onion" } } → 150g (1 onion)
    { item: "Red chilli", qty: [0.5, 1] }                                  → a range: ½–1
    { item: "Salt & pepper", text: "to taste" }                            → never scales
*/

window.COOKBOOK = {
  title: "Stefan's Cookbook",
  intro:
    "Go-to starters, mains, soups, sides, sauces, marinades and desserts. Pick the number of people and every quantity rescales; calories are an estimate per serving.",

  sections: [
    {
      id: "starters",
      name: "Starters",
      recipes: [
        {
          id: "summer-rolls",
          name: "Vietnamese Summer Rolls (Gỏi Cuốn)",
          servings: 4,
          kcal: 170,
          kcalNote: "Two rolls each, without the dipping sauce. Nuoc Cham adds about 35.",
          blurb: "Makes 8 rolls. Serve with the Nuoc Cham from Sauces.",
          ingredients: [
            { item: "Rice paper wrappers (22cm)", qty: 8, unit: "sheet" },
            { item: "Cooked king prawns, halved lengthways", qty: 240, unit: "g" },
            { item: "Rice vermicelli (dry weight)", qty: 50, unit: "g" },
            { item: "Little gem or butter lettuce leaves", qty: 100, unit: "g", also: { qty: 1, unit: "head" } },
            { item: "Carrot, julienned", qty: 100, unit: "g", also: { qty: 1, unit: "carrot" } },
            { item: "Cucumber, julienned", qty: 100, unit: "g" },
            { item: "Fresh mint leaves", qty: 10, unit: "g" },
            { item: "Fresh coriander", qty: 10, unit: "g" },
            { item: "Thai basil (optional)", qty: 10, unit: "g" },
          ],
          method: [
            "Cook the vermicelli as per the packet (usually 3–4 minutes in boiling water), rinse under cold water and drain very well. Snip into shorter lengths with scissors.",
            "Set everything out in piles before you start: rolling is an assembly line.",
            "Dip one rice paper in warm water for 10–15 seconds, until just pliable but still a little firm. It keeps softening on the board. Lay it on a damp tea towel or board.",
            "Lay 3 prawn halves cut-side up in a row about a third of the way up the wrapper, so they show through once rolled. Top with lettuce, a small pinch of noodles, carrot, cucumber and herbs. Don't overfill.",
            "Fold the bottom edge over the filling and tuck it in tightly, fold in both sides, then roll up firmly to the top.",
            "Serve straight away with Nuoc Cham for dipping.",
          ],
          notes: [
            { label: "Keeps", text: "Best within 2 hours. Cover with a damp tea towel and don't let them touch on the plate, or they stick together and tear." },
            { label: "Lighter", text: "Skip the vermicelli and double the lettuce and cucumber: about 125 kcal for two rolls." },
          ],
        },
        {
          id: "burrata-roasted-peaches",
          name: "Burrata with Roasted Peaches, Basil & Balsamic",
          servings: 2,
          kcal: 330,
          kcalNote: "Including the nuts; about 300 without.",
          ingredients: [
            { item: "Burrata", qty: 150, unit: "g", also: { qty: 1, unit: "ball" } },
            { item: "Ripe peaches or nectarines, halved and stoned", qty: 300, unit: "g", also: { qty: 2, unit: "peach" } },
            { item: "Honey", qty: 5, unit: "g" },
            { item: "Extra virgin olive oil", qty: 10, unit: "ml" },
            { item: "Thick aged balsamic", qty: 10, unit: "ml" },
            { item: "Fresh basil leaves", qty: 5, unit: "g" },
            { item: "Toasted pistachios or hazelnuts, chopped (optional)", qty: 10, unit: "g" },
            { item: "Flaky salt & black pepper", text: "to taste" },
          ],
          method: [
            "Take the burrata out of the fridge 30 minutes before serving. Fridge-cold dulls the flavour.",
            "Toss the peach halves with a little of the oil and the honey. Sear cut-side down in a very hot griddle pan for 3–4 minutes until charred, or air fry at 200°C for 8–10 minutes. Cut into wedges.",
            "Put the burrata in the middle of a plate with the warm peaches around it.",
            "Drizzle with the rest of the oil and the balsamic, then finish with flaky salt, black pepper, torn basil and the nuts. Tear the burrata open at the table.",
          ],
          notes: [
            { label: "Out of season", text: "Halved figs (same method), roasted cherry tomatoes on the vine, or griddled pear in winter." },
            { label: "Extra", text: "A slice or two of prosciutto adds a salty contrast, about 40 kcal a slice. Toasted sourdough for mopping up." },
          ],
        },
        {
          id: "feta-saganaki-cigars",
          name: "Feta Saganaki Filo Cigars with Honey",
          servings: 3,
          kcal: 360,
          kcalNote: "One cigar each, using a double layer of filo.",
          blurb: "A 200g block of feta cut into three sticks, wrapped in filo, air-fried and drizzled with honey.",
          ingredients: [
            { item: "Feta", qty: 200, unit: "g", also: { qty: 1, unit: "block" } },
            { item: "Filo pastry sheets", qty: 3, unit: "sheet" },
            { item: "Olive oil or melted butter, for brushing", qty: 10, unit: "ml" },
            { item: "Honey", qty: 30, unit: "g" },
            { item: "Sesame seeds", qty: 5, unit: "g" },
            { item: "Fresh thyme leaves or dried oregano", text: "a pinch" },
            { item: "Chilli flakes (optional)", text: "a pinch" },
            { item: "Black pepper", text: "to taste" },
          ],
          method: [
            "Pat the feta dry and cut the block lengthways into 3 sticks.",
            "Halve each filo sheet crossways. Keep the ones you're not using under a damp tea towel: filo dries out and cracks within minutes.",
            "Brush one half-sheet with oil and lay a second half on top. Wrap a feta stick as shown in the diagram below. Repeat for the other two.",
            "Brush or spray the outsides with oil and sprinkle with sesame seeds.",
            "Air fry at 190°C for 8–10 minutes, turning halfway, until deep golden and crisp. (Oven: 200°C for 12–15 minutes.)",
            "Rest for 1 minute, then drizzle with warm honey and finish with thyme or oregano, chilli flakes and black pepper.",
          ],
          diagram: {
            title: "How to wrap the feta",
            steps: [
              "Lay the feta stick along the bottom edge of the oiled double layer of filo, leaving a few cm clear at each end.",
              "Fold the bottom edge up over the feta.",
              "Fold both long sides in towards the middle, all the way up, so the ends are sealed.",
              "Roll up tightly to the top. Brush the last bit with oil so the seam sticks, and cook seam-side down.",
            ],
            svg: `<svg viewBox="0 0 720 210" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <marker id="dg-arrowhead" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
      <path class="dg-head" d="M0,0 L10,5 L0,10 z"/>
    </marker>
  </defs>
  <g>
    <circle class="dg-num" cx="20" cy="20" r="13"/><text class="dg-num-text" x="20" y="25">1</text>
    <rect class="dg-sheet" x="35" y="35" width="110" height="150"/>
    <rect class="dg-feta" x="60" y="152" width="60" height="18" rx="3"/>
  </g>
  <g transform="translate(180 0)">
    <circle class="dg-num" cx="20" cy="20" r="13"/><text class="dg-num-text" x="20" y="25">2</text>
    <rect class="dg-sheet" x="35" y="35" width="110" height="135"/>
    <rect class="dg-fold" x="35" y="128" width="110" height="42"/>
    <rect class="dg-hidden" x="60" y="140" width="60" height="18" rx="3"/>
    <path class="dg-arrow" d="M157 182 Q174 158 157 132" marker-end="url(#dg-arrowhead)"/>
  </g>
  <g transform="translate(360 0)">
    <circle class="dg-num" cx="20" cy="20" r="13"/><text class="dg-num-text" x="20" y="25">3</text>
    <rect class="dg-ghost" x="35" y="35" width="110" height="135"/>
    <rect class="dg-sheet" x="55" y="35" width="70" height="135"/>
    <rect class="dg-fold" x="55" y="128" width="70" height="42"/>
    <rect class="dg-fold" x="55" y="35" width="16" height="135"/>
    <rect class="dg-fold" x="109" y="35" width="16" height="135"/>
    <path class="dg-arrow" d="M24 100 L49 100" marker-end="url(#dg-arrowhead)"/>
    <path class="dg-arrow" d="M156 100 L131 100" marker-end="url(#dg-arrowhead)"/>
  </g>
  <g transform="translate(540 0)">
    <circle class="dg-num" cx="20" cy="20" r="13"/><text class="dg-num-text" x="20" y="25">4</text>
    <rect class="dg-sheet" x="55" y="35" width="70" height="80"/>
    <rect class="dg-fold" x="55" y="35" width="16" height="80"/>
    <rect class="dg-fold" x="109" y="35" width="16" height="80"/>
    <rect class="dg-fold" x="50" y="112" width="80" height="30" rx="15"/>
    <path class="dg-arrow" d="M142 140 Q164 112 142 82" marker-end="url(#dg-arrowhead)"/>
  </g>
</svg>`,
          },
          notes: [
            { label: "Honey", text: "Warm it so it runs thin and coats rather than sitting in blobs. Hot honey works well too." },
            { label: "Make ahead", text: "Wrap up to a day ahead and keep covered in the fridge, or freeze them and cook from frozen, adding 3–4 minutes." },
            { label: "Lighter", text: "Use a single layer of filo (one half-sheet per cigar): about 300 kcal each." },
          ],
        },
        {
          id: "tuna-tataki",
          name: "Tuna Tataki with Ponzu",
          servings: 2,
          kcal: 210,
          kcalNote: "As a starter. For a main, double the tuna and serve over a salad (about 400).",
          blurb: "Seared for seconds, chilled, then sliced thin so each piece has a cooked rim and a raw ruby centre.",
          ingredients: [
            { item: "Tuna steak, at least 2.5cm thick", qty: 250, unit: "g" },
            { item: "Neutral oil", qty: 5, unit: "ml" },
            { item: "Sesame seeds (optional crust)", qty: 10, unit: "g" },
            { item: "Salt & black pepper", text: "to taste" },
            { item: "Soy sauce (ponzu)", qty: 30, unit: "ml" },
            { item: "Lime or lemon juice (ponzu)", qty: 20, unit: "ml", also: { qty: 1, unit: "lime" } },
            { item: "Orange juice (ponzu)", qty: 10, unit: "ml" },
            { item: "Mirin (ponzu)", qty: 10, unit: "ml" },
            { item: "Rice vinegar (ponzu)", qty: 5, unit: "ml" },
            { item: "Ginger, grated (ponzu)", qty: 5, unit: "g" },
            { item: "Spring onions, thinly sliced", qty: 2, unit: "spring onion" },
            { item: "Red chilli, thinly sliced", qty: [0.25, 0.5] },
            { item: "Daikon or radish, finely grated (optional)", qty: 50, unit: "g" },
          ],
          method: [
            "Take the tuna out of the fridge 10 minutes before cooking. Pat it very dry and season with salt and pepper. If using sesame, press it onto the sides.",
            "Mix the ponzu ingredients together.",
            "Heat a heavy pan until it's smoking, then add the oil. Sear the tuna for 20–30 seconds per side, edges included, until there's a cooked band of only 2–3mm.",
            "Plunge it straight into iced water for 30 seconds to stop the cooking, then pat dry. (Or put it on a plate in the fridge for 10 minutes.)",
            "Slice 5mm thick across the grain with your sharpest knife, using single long strokes rather than sawing.",
            "Fan the slices out, spoon over the ponzu and scatter with spring onion, chilli and daikon.",
          ],
          notes: [
            { label: "How rare is safe?", text: "Seared outside and raw in the middle is the standard way to eat tuna. Bacteria sit on the surface of a whole steak, and the sear deals with those. Tuna rarely carries parasites (US FDA rules exempt yellowfin, bigeye and bluefin from the freezing requirement for raw fish), and most supermarket tuna has been frozen anyway. The real risk is poor storage: tuna left warm builds up histamine, which cooking doesn't destroy. So buy it well in date, keep it cold and cook it the day you open it. It should be deep red, glossy and smell clean; if it's brown, sticky or smells fishy, don't eat it rare. Avoid rare fish if pregnant or immunocompromised." },
            { label: "Fully raw?", text: "For poke or sashimi, where there's no sear at all, buy sushi-grade tuna from a fishmonger." },
            { label: "Thin steaks", text: "Supermarket steaks are often only 1.5cm thick and cook through fast. Sear for 15 seconds per side, or ask a fishmonger for a thick cut from the loin." },
            { label: "Other dressing", text: "The classic soy, honey and sesame dressing works the same way: 30ml soy, 10g honey, 10ml rice vinegar, 5ml sesame oil and a little ginger." },
          ],
        },
      ],
    },

    {
      id: "soups",
      name: "Soups",
      recipes: [
        {
          id: "jewish-chicken-soup",
          name: "Classic Jewish Chicken Soup",
          servings: 4,
          kcal: 220,
          kcalNote: "Soup and chicken, without noodles or matzo balls.",
          ingredients: [
            { item: "Whole chicken or bone-in thighs/drumsticks", qty: 1000, unit: "g" },
            { item: "Onion, quartered", qty: 250, unit: "g", also: { qty: 1, unit: "large onion" } },
            { item: "Carrots, chopped", qty: 300, unit: "g", also: { qty: 3, unit: "carrot" } },
            { item: "Celery, chopped", qty: 150, unit: "g", also: { qty: 3, unit: "stick" } },
            { item: "Parsnip, chopped (optional, traditional)", qty: 150, unit: "g", also: { qty: 1, unit: "parsnip" } },
            { item: "Garlic", qty: 2, unit: "clove" },
            { item: "Fresh dill", qty: 15, unit: "g" },
            { item: "Fresh parsley", qty: 15, unit: "g" },
            { item: "Bay leaves", qty: 2 },
            { item: "Black peppercorns", qty: 3, unit: "g" },
            { item: "Salt", text: "to taste" },
            { item: "Water", qty: 2500, unit: "ml" },
            { item: "Egg noodles or matzo balls (optional, to serve)", text: "as desired" },
          ],
          method: [
            "Place the chicken in a large pot, cover with the water, bring to the boil and skim off any scum.",
            "Add the onion, carrots, celery, parsnip, garlic, bay leaves and peppercorns.",
            "Simmer gently, partially covered, for 1.5–2 hours until the chicken is falling off the bone and the stock is deeply flavoured.",
            "Remove the chicken, shred the meat and discard the bones and skin. Strain the stock if you want a clearer soup, or leave the vegetables in.",
            "Return the shredded chicken to the pot and season with salt. Stir through the chopped dill and parsley just before serving.",
            "Serve with noodles or matzo balls if using.",
          ],
        },
        {
          id: "butternut-squash-soup",
          name: "Curried Butternut Squash Soup",
          servings: 4,
          kcal: 190,
          ingredients: [
            { item: "Butternut squash, peeled and cubed", qty: 1000, unit: "g", also: { qty: 1, unit: "medium squash" } },
            { item: "Onion, diced", qty: 150, unit: "g", also: { qty: 1, unit: "onion" } },
            { item: "Garlic, minced", qty: 2, unit: "clove" },
            { item: "Fresh ginger, grated", qty: 6, unit: "g" },
            { item: "Curry powder", qty: [6, 12], unit: "g" },
            { item: "Ground cumin", qty: 2, unit: "g" },
            { item: "Vegetable stock", qty: 800, unit: "ml" },
            { item: "Olive oil", qty: 15, unit: "ml" },
            { item: "Salt & pepper", text: "to taste" },
          ],
          method: [
            "Heat the oil in a large pot and sauté the onion until softened.",
            "Add the garlic, ginger, curry powder and cumin and cook for 1 minute until fragrant.",
            "Add the squash and stock, bring to the boil, then simmer for 20–25 minutes until the squash is tender.",
            "Blend until smooth and season to taste. Thin with extra stock or water if too thick.",
          ],
        },
        {
          id: "minestrone",
          name: "Minestrone",
          servings: 4,
          kcal: 210,
          ingredients: [
            { item: "Olive oil", qty: 15, unit: "ml" },
            { item: "Onion, diced", qty: 150, unit: "g", also: { qty: 1, unit: "onion" } },
            { item: "Carrots, diced", qty: 200, unit: "g", also: { qty: 2, unit: "carrot" } },
            { item: "Celery, diced", qty: 100, unit: "g", also: { qty: 2, unit: "stick" } },
            { item: "Garlic, minced", qty: 2, unit: "clove" },
            { item: "Courgette, diced", qty: 200, unit: "g", also: { qty: 1, unit: "courgette" } },
            { item: "Tinned chopped tomatoes", qty: 400, unit: "g", also: { qty: 1, unit: "tin" } },
            { item: "Vegetable or chicken stock", qty: 1000, unit: "ml" },
            { item: "Tinned cannellini or borlotti beans, drained", qty: 400, unit: "g", also: { qty: 1, unit: "tin" } },
            { item: "Small pasta (e.g. ditalini)", qty: 80, unit: "g" },
            { item: "Parmesan rind (optional)", text: "1 piece" },
            { item: "Fresh basil or dried oregano", text: "to taste" },
            { item: "Salt & pepper", text: "to taste" },
          ],
          method: [
            "Heat the oil and sauté the onion, carrot and celery until softened, adding the garlic for the last minute.",
            "Add the courgette, tomatoes, stock and the parmesan rind if using. Simmer for 15 minutes.",
            "Add the beans and pasta and cook until the pasta is al dente, about 10 minutes more.",
            "Remove the parmesan rind, season, and stir through the basil or oregano before serving.",
          ],
        },
        {
          id: "french-onion-soup",
          name: "French Onion Soup",
          servings: 4,
          kcal: 150,
          kcalNote: "Soup alone. About 320 kcal per serving with the bread and cheese topping.",
          ingredients: [
            { item: "Large onions, thinly sliced", qty: [1000, 1250], unit: "g", also: { qty: [4, 5], unit: "large onion" } },
            { item: "Butter", qty: 30, unit: "g" },
            { item: "Olive oil", qty: 15, unit: "ml" },
            { item: "Sugar (helps caramelise)", qty: 4, unit: "g" },
            { item: "Garlic, minced", qty: 1, unit: "clove" },
            { item: "Plain flour", qty: 8, unit: "g" },
            { item: "Dry white wine", qty: 120, unit: "ml" },
            { item: "Beef stock", qty: 1000, unit: "ml" },
            { item: "Bay leaf", qty: 1 },
            { item: "Fresh thyme", qty: 3, unit: "sprig" },
            { item: "Baguette slices, toasted (optional)", qty: 4 },
            { item: "Gruyère, grated (optional)", qty: 100, unit: "g" },
          ],
          method: [
            "Melt the butter with the oil in a large pot. Add the onions and sugar and cook low and slow, stirring often, for 35–45 minutes until deeply caramelised. Don't rush this step.",
            "Add the garlic and cook for 1 minute, then stir in the flour and cook for 1 minute more.",
            "Deglaze with the wine, scraping up any bits, and let it reduce slightly.",
            "Add the stock, bay leaf and thyme and simmer for 20–30 minutes. Season to taste.",
            "To serve the classic way, ladle into oven-proof bowls, top with toasted baguette and grated Gruyère, and grill until bubbling and golden.",
          ],
        },
      ],
    },

    {
      id: "mains",
      name: "Mains",
      recipes: [
        {
          id: "gochujang-chicken-bowls",
          name: "Gochujang Chicken & Cucumber Bowls",
          servings: 2,
          kcal: 490,
          kcalNote: "Without rice. 50g dry rice adds about 180; chicken breast instead of thigh saves about 115.",
          ingredients: [
            { item: "Boneless, skinless chicken thighs", qty: 400, unit: "g" },
            { item: "Gochujang", qty: 30, unit: "g" },
            { item: "Honey", qty: 10, unit: "g" },
            { item: "Soy sauce", qty: 15, unit: "ml" },
            { item: "Garlic, grated", qty: 2, unit: "clove" },
            { item: "Ginger, grated", qty: 5, unit: "g" },
            { item: "Toasted sesame oil", qty: 5, unit: "ml" },
            { item: "Rice vinegar", qty: 5, unit: "ml" },
            { item: "White or Chinese cabbage, finely shredded", qty: 200, unit: "g" },
            { item: "Carrot, julienned", qty: 100, unit: "g", also: { qty: 1, unit: "carrot" } },
            { item: "Spring onions, sliced", qty: 2, unit: "spring onion" },
            { item: "Sesame seeds", qty: 5, unit: "g" },
            { item: "Smashed Cucumber Salad or Quick Cucumber Pickle (Sides)", text: "to serve" },
          ],
          method: [
            "Mix the gochujang, honey, soy, garlic, ginger, sesame oil and rice vinegar. Set a third aside for glazing.",
            "Coat the chicken in the rest and marinate for at least 15 minutes (or up to a day in the fridge).",
            "Air fry at 200°C for 14–16 minutes, turning halfway. Brush with the reserved glaze for the last 4 minutes only: added any earlier, the sugar burns. Or grill under a high heat.",
            "Rest for 3 minutes, then slice.",
            "Build the bowls: cabbage and carrot, then the chicken, cucumber, spring onion and sesame seeds.",
          ],
          notes: [
            { label: "Tip", text: "Gochujang brands vary a lot in heat and saltiness, so taste the glaze before it goes on." },
          ],
          serveWith: {
            title: "Bases",
            items: [
              "As above: shredded cabbage and carrot",
              "Lettuce cups",
              "Cauliflower rice",
              "50g dry rice (~180 kcal) for a more filling bowl",
            ],
          },
        },
        {
          id: "thai-beef-mince",
          name: "Spicy Thai Beef Mince, Loaded with Veg",
          servings: 4,
          kcal: 265,
          kcalNote: "Without rice. A fried egg on top adds about 90.",
          blurb: "Pad kra pao-style, bulked out with whatever veg is in the fridge.",
          ingredients: [
            { item: "5% fat beef mince", qty: 500, unit: "g" },
            { item: "Neutral oil", qty: 10, unit: "ml" },
            { item: "Garlic, finely chopped", qty: 4, unit: "clove" },
            { item: "Red bird's eye chillies, finely chopped", qty: [3, 6] },
            { item: "Shallots or onion, finely chopped", qty: 60, unit: "g", also: { qty: 2, unit: "shallot" } },
            { item: "Mushrooms, finely chopped", qty: 250, unit: "g" },
            { item: "Carrot, grated", qty: 150, unit: "g", also: { qty: 1, unit: "large carrot" } },
            { item: "Frozen peas", qty: 150, unit: "g" },
            { item: "Spinach", qty: 150, unit: "g" },
            { item: "Light soy sauce", qty: 30, unit: "ml" },
            { item: "Oyster sauce", qty: 30, unit: "ml" },
            { item: "Fish sauce", qty: 15, unit: "ml" },
            { item: "Dark soy sauce (for colour)", qty: 10, unit: "ml" },
            { item: "Sugar", qty: 5, unit: "g" },
            { item: "Thai basil (or regular basil)", qty: 20, unit: "g" },
            { item: "Lime wedges, to serve", qty: 1, unit: "lime" },
          ],
          method: [
            "Mix the soy sauces, oyster sauce, fish sauce and sugar in a cup.",
            "Heat the oil in a wok or large pan over a high heat. Fry the garlic, chillies and shallots for 30 seconds until fragrant.",
            "Add the mince and break it up. Leave it alone for a minute at a time so it browns rather than steams. Cook until any liquid has gone and it starts to catch.",
            "Add the mushrooms and carrot and keep frying until their moisture has cooked off too.",
            "Pour in the sauce, then stir in the peas and spinach until the spinach wilts and everything is glossy.",
            "Off the heat, stir through the basil. Serve with lime wedges.",
          ],
          notes: [
            { label: "Veg", text: "Almost anything works: courgette, peppers, green beans, cabbage, sweetcorn. Chop it small so it disappears into the mince. Cook watery veg (mushrooms, courgette) before adding the sauce, so it doesn't stew." },
          ],
          serveWith: {
            title: "Ways to serve it",
            items: [
              "Lettuce cups",
              "Cauliflower rice",
              "50g dry jasmine rice (~180 kcal) with a crispy fried egg on top, the classic way",
            ],
          },
        },
      ],
    },

    {
      id: "sides",
      name: "Sides",
      recipes: [
        {
          id: "do-chua",
          name: "Đồ Chua (Pickled Carrot & Daikon)",
          servings: 2,
          kcal: 40,
          kcalNote: "Roughly 50–55 kcal per 100g of pickled veg. Most of the sugar stays in the brine.",
          ingredients: [
            { item: "Carrot, julienned", qty: 150, unit: "g", also: { qty: 1, unit: "large carrot" } },
            { item: "Daikon, julienned (or extra carrot)", qty: 250, unit: "g", also: { qty: 1, unit: "small daikon" } },
            { item: "Salt (draw-out step)", qty: 6, unit: "g" },
            { item: "Sugar (draw-out step)", qty: 4, unit: "g" },
            { item: "White or rice vinegar", qty: 120, unit: "ml" },
            { item: "Warm water", qty: 120, unit: "ml" },
            { item: "Sugar (pickling liquid)", qty: 36, unit: "g" },
            { item: "Salt (pickling liquid)", qty: 3, unit: "g" },
          ],
          method: [
            "Toss the julienned veg with the draw-out salt and sugar and leave for 15–20 minutes.",
            "Squeeze out the liquid and pat dry with paper towel.",
            "Dissolve the pickling-liquid sugar and salt in the vinegar and warm water.",
            "Pack the veg loosely into a jar (loose packing lets the liquid circulate) and pour over the liquid until submerged.",
            "Rest for 1 hour at room temperature, then refrigerate overnight for the best flavour. If you're short on time it can go straight into the fridge (allow 4–6 hours minimum).",
          ],
          notes: [
            { label: "Keeps", text: "1–2 weeks in the fridge." },
            {
              label: "Vinegar notes",
              text: "Rice vinegar is the classic choice. Mirin is a sweet wine, not acidic enough to pickle; malt vinegar (e.g. Sarson's) is too harsh and clashes with the clean flavour. Apple cider vinegar is a fine substitute if rice vinegar runs low: add an extra 5–6g sugar to round out the fruitier edge, or blend it 50/50 with any remaining rice vinegar.",
            },
          ],
        },
        {
          id: "cucumber-pickle",
          name: "Quick Cucumber Pickle",
          servings: 4,
          kcal: 15,
          kcalNote: "About 25–30 kcal per 100g; a serving is ~50g.",
          blurb: "Made fresh as a separate small batch. Don't add it to the carrot jar: cucumber waters down the brine and shortens its shelf life.",
          ingredients: [
            { item: "Cucumber, thinly sliced", qty: 200, unit: "g" },
            { item: "Rice vinegar", qty: 90, unit: "ml" },
            { item: "Sugar", qty: 36, unit: "g" },
            { item: "Salt", qty: 1.5, unit: "g" },
          ],
          method: [
            "Toss everything together.",
            "Leave for 15–30 minutes at room temperature. Don't leave it much longer or it goes limp and watery.",
          ],
          notes: [
            {
              label: "Combining with carrots",
              text: "Possible for convenience in one jar, but then eat it within 2–3 days rather than the 1–2 weeks carrots keep alone. Scoop out the cucumber seeds first and pat dry before jarring to limit extra water.",
            },
          ],
        },
        {
          id: "tandoori-air-fryer-veg",
          name: "Tandoori Air-Fryer Veg",
          servings: 4,
          kcal: 85,
          blurb: "Carrot, broccoli and cauliflower.",
          ingredients: [
            { item: "Carrots, cut into thin batons", qty: 200, unit: "g", also: { qty: 2, unit: "carrot" } },
            { item: "Broccoli, in florets", qty: 200, unit: "g" },
            { item: "Cauliflower, in florets", qty: 250, unit: "g" },
            { item: "Oil", qty: 15, unit: "ml" },
            { item: "Tandoori masala (or cumin, coriander, smoked paprika, turmeric, garlic powder)", qty: 5, unit: "g" },
            { item: "Salt", text: "to taste" },
            { item: "Lemon juice, to finish", qty: 20, unit: "ml", also: { qty: 0.5, unit: "lemon" } },
            { item: "Fresh coriander, to finish", qty: 10, unit: "g" },
          ],
          method: [
            "Toss the veg with the oil first. It's always needed so the spices bind rather than sitting as a dry, grainy layer.",
            "Season with the tandoori masala (or your own mix of cumin, coriander, smoked paprika, turmeric, garlic powder and salt). Massage in by hand for even coverage.",
            "Air fry at 200°C for 12–15 minutes, shaking halfway. Cut the carrots thinner than the florets so everything finishes together.",
            "Finish with the lemon juice and fresh coriander. Serve with a yoghurt-mint or yoghurt-cumin dip if you have one.",
          ],
          notes: [
            {
              label: "No yoghurt on hand?",
              text: "Use oil + tomato paste + spices + a squeeze of lemon as the binding paste instead, the closest tandoori-compatible substitute. A dialled-back peri-peri (~5ml) with extra curry powder also works as a binder, though the flavour reads as a different lane rather than a tight tandoori match.",
            },
          ],
        },
        {
          id: "smashed-cucumber-salad",
          name: "Chinese Smashed Cucumber Salad",
          servings: 2,
          kcal: 85,
          kcalNote: "Mostly from the sesame and chilli oil.",
          ingredients: [
            { item: "Cucumber", qty: 350, unit: "g", also: { qty: 1, unit: "large cucumber" } },
            { item: "Salt", qty: 3, unit: "g" },
            { item: "Sugar", qty: 3, unit: "g" },
            { item: "Garlic, finely minced", qty: 2, unit: "clove" },
            { item: "Chinkiang black vinegar (or rice vinegar)", qty: 15, unit: "ml" },
            { item: "Light soy sauce", qty: 10, unit: "ml" },
            { item: "Toasted sesame oil", qty: 5, unit: "ml" },
            { item: "Chilli oil or chilli crisp", qty: [5, 10], unit: "ml" },
            { item: "Toasted sesame seeds or coriander (optional)", text: "to finish" },
          ],
          method: [
            "Lay the cucumber on a board and smash it along its length with the flat of a cleaver or a rolling pin until it cracks open.",
            "Cut into bite-sized chunks on the diagonal. The rough, cracked edges are what grab the dressing.",
            "Toss with the salt and sugar and leave in a sieve for 15–30 minutes. Discard the liquid: this keeps the cucumber crunchy and stops it watering down the dressing.",
            "Mix the garlic, vinegar, soy, sesame oil and chilli oil.",
            "Toss the cucumber in the dressing, finish with sesame seeds or coriander and serve within 30 minutes.",
          ],
        },
        {
          id: "miznon-beans",
          name: "Miznon Green Beans",
          servings: 4,
          kcal: 95,
          kcalNote: "Mostly from the olive oil.",
          ingredients: [
            { item: "Green string beans, trimmed", qty: 400, unit: "g" },
            { item: "Extra virgin olive oil", qty: 30, unit: "ml" },
            { item: "Lemon juice", qty: 30, unit: "ml", also: { qty: 1, unit: "lemon" } },
            { item: "Lemon zest (from the same lemon)", qty: 1, unit: "lemon" },
            { item: "Garlic, minced", qty: 1, unit: "clove" },
            { item: "Flaky salt", text: "to taste" },
          ],
          method: [
            "Cook the beans in well-salted boiling water for about 5 minutes.",
            "Drain and plunge straight into ice-cold water to stop the cooking and keep them bright green. Drain well and pat dry.",
            "Put the oil, lemon juice, zest and garlic in a jar and shake hard (or whisk) until emulsified.",
            "Toss the beans in the dressing and finish with flaky salt.",
          ],
          notes: [
            { label: "Timing", text: "Dress them just before serving: the lemon turns the beans olive-drab after about 30 minutes." },
          ],
        },
      ],
    },

    {
      id: "sauces",
      name: "Sauces",
      recipes: [
        {
          id: "nuoc-cham",
          name: "Nuoc Cham (dipping sauce)",
          servings: 2,
          yield: { qty: 90, unit: "ml" },
          kcal: 35,
          kcalNote: "Almost all from the sugar.",
          ingredients: [
            { item: "Fish sauce", qty: 20, unit: "ml" },
            { item: "Lime juice (top up with lemon if short)", qty: 20, unit: "ml", also: { qty: 0.75, unit: "lime" } },
            { item: "Sugar", qty: [12, 18], unit: "g" },
            { item: "Warm water", qty: 20, unit: "ml" },
            { item: "Garlic, minced", qty: 0.5, unit: "clove" },
            { item: "Red chilli, chopped", qty: [0.25, 0.5] },
          ],
          method: [
            "Dissolve the sugar in the warm water.",
            "Stir in the fish sauce and lime juice, then add the garlic and chilli last.",
            "Balance salty / sour / sweet / heat to taste.",
          ],
          notes: [{ label: "Keeps", text: "Best fresh; 2–3 days in the fridge." }],
        },
        {
          id: "chimichurri",
          name: "Chimichurri",
          servings: 4,
          yield: { qty: 120, unit: "ml" },
          kcal: 125,
          kcalNote: "Oil-heavy, so use sparingly if you're watching the numbers.",
          ingredients: [
            { item: "Fresh flat-leaf parsley, finely chopped", qty: 30, unit: "g", also: { qty: 1, unit: "small bunch", approx: true } },
            { item: "Extra virgin olive oil", qty: 60, unit: "ml" },
            { item: "Red wine vinegar", qty: 30, unit: "ml" },
            { item: "Garlic, minced", qty: 3, unit: "clove" },
            { item: "Dried oregano", qty: 4, unit: "g" },
            { item: "Salt & pepper", text: "to taste" },
          ],
          method: [
            "Finely chop the parsley (by hand, not in a blender, so it stays bright and doesn't turn to paste).",
            "Mix the parsley, garlic and oregano, then whisk in the oil and vinegar. Season with salt and pepper.",
            "Rest for at least 15–20 minutes before serving to let the flavours meld.",
          ],
          notes: [{ label: "Keeps", text: "A few days in the fridge, covered." }],
        },
        {
          id: "red-wine-sauce",
          name: "Red Wine Sauce",
          servings: 4,
          yield: { qty: 150, unit: "ml" },
          kcal: 95,
          kcalNote: "About 370 kcal for the whole batch.",
          blurb: "For steak or similar.",
          ingredients: [
            { item: "Shallots, finely diced (or 1 medium onion)", qty: 60, unit: "g", also: { qty: 2, unit: "shallot" } },
            { item: "Tomato paste", qty: 15, unit: "g" },
            { item: "Red wine", qty: 500, unit: "ml" },
            { item: "Beef stock", qty: 250, unit: "ml" },
            { item: "Bay leaves", qty: [1, 2] },
            { item: "Fresh thyme", qty: 3, unit: "sprig" },
            { item: "Worcestershire sauce", qty: 15, unit: "ml" },
            { item: "Black pepper", text: "to taste" },
            { item: "Butter, cold, cubed", qty: 20, unit: "g" },
          ],
          method: [
            "Sauté the shallots in a little butter or oil until translucent.",
            "Add the tomato paste and cook it down for 1–2 minutes.",
            "Deglaze with the red wine and reduce by at least half.",
            "Add the beef stock, bay leaves, thyme and Worcestershire sauce. Season with black pepper.",
            "Reduce until syrupy and coating the back of a spoon.",
            "Off the heat, whisk in the cold butter a knob at a time until emulsified and glossy.",
          ],
        },
        {
          id: "steak-suzette-sauce",
          name: "Steak Suzette Sauce",
          servings: 8,
          yield: { qty: 440, unit: "ml" },
          kcal: 260,
          kcalNote: "Almost all from the olive oil. The whole batch is about 2,070 kcal.",
          blurb: "A warm oil, lemon and soy sauce to spoon over steak.",
          ingredients: [
            { item: "Olive oil", qty: 240, unit: "ml" },
            { item: "Fresh lemon juice", qty: 160, unit: "ml", also: { qty: 4, unit: "lemon", approx: true } },
            { item: "Soy sauce", qty: 40, unit: "ml" },
            { item: "Red chillies, finely chopped", qty: [2, 3] },
            { item: "Garlic, crushed", qty: [2, 3], unit: "clove" },
            { item: "Salt", text: "a pinch" },
          ],
          method: [
            "Put all the sauce ingredients in a small pot over a medium heat for about 2 minutes, until hot.",
            "Spoon over the steak.",
          ],
        },
        {
          id: "piri-piri-sauce",
          name: "Piri-Piri Sauce (Mozambique-style)",
          servings: 8,
          yield: { qty: 200, unit: "ml" },
          kcal: 90,
          kcalNote: "Per 25ml, almost all from the olive oil.",
          blurb: "A fresh, blended version of the Mozambican chilli, lemon and garlic sauce. The traditional fermented method is in the notes.",
          ingredients: [
            { item: "Red bird's eye chillies, stems off", qty: 30, unit: "g", also: { qty: 15, unit: "chilli", approx: true } },
            { item: "Larger red chillies (e.g. Fresno), for colour and body", qty: 40, unit: "g", also: { qty: 2, unit: "chilli" } },
            { item: "Garlic", qty: 4, unit: "clove" },
            { item: "Lemon juice", qty: 60, unit: "ml", also: { qty: 1.5, unit: "lemon" } },
            { item: "Lemon zest", qty: 1, unit: "lemon" },
            { item: "Smoked paprika", qty: 3, unit: "g" },
            { item: "Dried oregano", qty: 1, unit: "g" },
            { item: "Salt", qty: 4, unit: "g" },
            { item: "Whisky (optional)", qty: 10, unit: "ml" },
            { item: "Extra virgin olive oil", qty: 80, unit: "ml" },
          ],
          method: [
            "Roughly chop the chillies (wear gloves if you're sensitive). Keep the seeds for full heat, or remove some to tame it.",
            "Blend the chillies, garlic, lemon juice and zest, paprika, oregano, salt and whisky to a smooth paste.",
            "With the blender running, drizzle in the oil until emulsified.",
            "Rest for at least an hour, ideally overnight. The heat mellows and the flavours come together.",
          ],
          notes: [
            { label: "The traditional way", text: "Mozambican families ferment dried piri-piri chillies (a small, very hot African bird's eye variety) raw in lemon or lime juice and salt, topped with olive oil, at room temperature for about 2 weeks, then blend it smooth. Some add a splash of whisky at the end. Scaled down: 50g dried chillies, 200ml lemon/lime juice and 5g salt in a sterilised jar with oil to cover." },
            { label: "Chillies", text: "Red bird's eye chillies from Asian supermarkets are the closest easy match. Dried African piri-piri chillies are sold online." },
            { label: "As a chicken marinade", text: "For 1kg chicken, mix 45ml of the sauce with an extra 30ml lemon juice, 2 crushed garlic cloves and a pinch of smoked paprika. Marinate for up to 24 hours. Keep some clean sauce aside for basting." },
            { label: "Keeps", text: "About a week in the fridge with a layer of oil on top. For 3–4 weeks, simmer it for 5 minutes before jarring; it ends up a little mellower." },
          ],
        },
        {
          id: "prego-sauce",
          name: "Prego Sauce",
          servings: 4,
          kcal: 150,
          kcalNote: "Sauce only. A 150g rump steak adds about 190, a Portuguese roll about 200.",
          blurb: "A garlic, red wine and chilli sauce for prego rolls. Thin steaks (about 600g for 4) marinate in it, then the marinade is boiled down in the steak pan.",
          ingredients: [
            { item: "Garlic, crushed", qty: 6, unit: "clove" },
            { item: "Red wine", qty: 120, unit: "ml" },
            { item: "Piri-Piri Sauce (above), or 2–3 bird's eye chillies", qty: 30, unit: "ml" },
            { item: "Tomato paste", qty: 15, unit: "g" },
            { item: "Bay leaves", qty: 2 },
            { item: "Smoked paprika", qty: 2, unit: "g" },
            { item: "Dried oregano", qty: 1, unit: "g" },
            { item: "Olive oil", qty: 30, unit: "ml" },
            { item: "Butter, cold", qty: 20, unit: "g" },
            { item: "Lemon juice", qty: 10, unit: "ml" },
            { item: "Salt & black pepper", text: "to taste" },
          ],
          method: [
            "Mix everything except the butter, lemon juice and salt. Pour over thin steaks (rump or sirloin, bashed to about 1cm) and marinate for 1–8 hours.",
            "Lift out the steaks, scrape off the excess marinade, pat dry and season with salt.",
            "Sear in a smoking-hot pan for 45–60 seconds per side, then rest on a board.",
            "Pour the marinade into the same pan and boil hard for 3–5 minutes until reduced by half and glossy. Boiling it hard is what makes marinade that's touched raw meat safe to eat. Remove the bay leaves.",
            "Off the heat, whisk in the butter and lemon juice. Put the steaks and their resting juices back in and turn to coat.",
            "Serve in buttered, toasted Portuguese rolls (papo-secos) with the extra sauce spooned over, or with chips and a fried egg.",
          ],
          notes: [
            { label: "Mozambique vs Portugal", text: "In Portugal a prego is a plain garlic steak roll with mustard or hot sauce on the side. The saucy, chilli-heavy version comes from Mozambique and spread through South Africa's Portuguese community." },
          ],
        },
      ],
    },

    {
      id: "marinades",
      name: "Marinades",
      recipes: [
        {
          id: "vietnamese-lemongrass-chicken",
          name: "Vietnamese Lemongrass Chicken",
          servings: 2,
          kcal: 395,
          kcalNote: "Chicken, marinade, and about 5g of oil to cook.",
          ingredients: [
            { item: "Chicken breast", qty: 380, unit: "g", also: { qty: 2, unit: "breast" } },
            { item: "Lemongrass, minced", qty: 20, unit: "g", also: { qty: 1, unit: "stalk" } },
            { item: "Garlic, grated", qty: 2, unit: "clove" },
            { item: "Shallot, minced", qty: 30, unit: "g", also: { qty: 1, unit: "shallot" } },
            { item: "Fish sauce", qty: 20, unit: "ml" },
            { item: "Light soy sauce", qty: 15, unit: "ml" },
            { item: "Honey or brown sugar", qty: 15, unit: "g" },
            { item: "Ginger, grated", qty: 5, unit: "g" },
            { item: "Red chilli, chopped", qty: [0.5, 1] },
            { item: "Lime juice", qty: 15, unit: "ml", also: { qty: 0.5, unit: "lime" } },
            { item: "Five-spice (optional)", qty: 1, unit: "g" },
          ],
          method: [
            "Mix everything except the chicken, either in a blender or by mincing finely by hand.",
            "Coat the chicken and marinate for 2–8 hours (30 minutes to 1.5 hours for thin cutlets).",
            "Pan-sear or grill hard over a high heat so the sugar caramelises.",
            "Rest, then slice on the diagonal.",
          ],
          notes: [
            { label: "Tip", text: "If the marinade is too thick to blend, add 5–10ml extra fish sauce or 15–30ml water, or mince finely by hand instead." },
          ],
          serveWith: {
            title: "Low-calorie ways to serve it (no vermicelli needed)",
            items: [
              "Lettuce cups (butter lettuce or iceberg): wrap chicken, pickles and herbs",
              "Cabbage or lettuce salad bowl: shredded cabbage base, chicken, pickles, herbs, nuoc cham drizzle",
              "Cauliflower rice",
              "Courgetti (zucchini noodles)",
              "Shirataki/konjac noodles: the closest texture match to vermicelli, almost zero calories",
              "50g dry rice (~180 kcal) for a more traditional feel, or 30–40g alongside a salad for extra volume at a lower calorie cost",
            ],
          },
        },
        {
          id: "shish-tawook",
          name: "Lebanese Yoghurt Chicken (Shish Tawook style)",
          servings: 2,
          kcal: 435,
          kcalNote: "Chicken, marinade, and about 5g of oil to cook.",
          ingredients: [
            { item: "Chicken breast", qty: 380, unit: "g", also: { qty: 2, unit: "breast" } },
            { item: "Fat-free Greek yoghurt", qty: 150, unit: "g" },
            { item: "Lemon juice", qty: 45, unit: "ml", also: { qty: 1, unit: "lemon" } },
            { item: "Garlic, grated", qty: 2, unit: "clove" },
            { item: "Olive oil", qty: 15, unit: "ml" },
            { item: "Ground cumin", qty: 2, unit: "g" },
            { item: "Paprika", qty: 2, unit: "g" },
            { item: "Ground coriander", qty: 1, unit: "g" },
            { item: "Dried oregano", qty: 0.5, unit: "g" },
            { item: "Cinnamon (optional)", text: "a pinch" },
            { item: "Salt & pepper", text: "to taste" },
          ],
          method: [
            "Mix the marinade ingredients together.",
            "Coat the chicken and marinate for 2–8 hours (overnight is best).",
            "Grill or pan-sear over a high heat, traditionally on skewers.",
          ],
        },
      ],
    },

    {
      id: "desserts",
      name: "Desserts",
      recipes: [],
      ideas: [
        { name: "Spiced roasted stone fruit", text: "Roast peaches or plums with cinnamon and honey; serve warm over cold yoghurt for a hot/cold contrast." },
      ],
    },
  ],
};
