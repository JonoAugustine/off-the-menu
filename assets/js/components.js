/** Simple class to represent themes. */
class Theme {
  constructor(name, location, togglerIcon) {
    this.name = name;
    this.location = location;
    this.togglerIcon = togglerIcon;
  }
}

/** Object used to track & toggle themes. */
const theme = {
  /** Light Theme */
  light: new Theme("light", "./assets/style/light.css", "moon"),
  /** dark Theme */
  dark: new Theme("dark", "./assets/style/dark.css", "sun"),
  /** Gets the current src link of the theme import. */
  link: function() {
    return $("#theme-link");
  },
  current: function() {
    return this.link()
      .attr("href")
      .includes("dark")
      ? this.dark
      : this.light;
  },
  /** Loads the saved theme to the page. Defaults to light. */
  load: function() {
    // Attempt to load & set theme from local storage
    const lst = localStorage["theme"];
    if (typeof lst === "string" && lst == this.dark.name) {
      this.link().attr("href", this.dark.location);
    } else {
      this.link().attr("href", this.light.location);
    }
  },
  /** Toggles the current theme src. */
  toggle: function() {
    const nTheme = this.current() == this.light ? this.dark : this.light;
    this.link().attr("href", nTheme.location);
    localStorage["theme"] = nTheme.name;
  }
};

/** Root div to manipulate. */
const root = () => $("#root");

/**
 * Empties root element and appends child element.
 * @param {*} component child DOM element
 * @returns The root element with given child appended.
 */
const render = component => {
  const name = component.attr("page-name");
  if (name !== null) user.setPage(name);
  return root()
    .empty()
    .append(component);
};

/**
 * Simplified DOM Element creation. Same as `$("<div>")`
 * but does not need chevrons.
 * @param {String} tag
 * @returns A new JQuery DOM Element of the given tag
 */
const jqe = (tag, callback) => {
  const e = $(`<${tag}>`);
  if (typeof callback === "function") callback(e);
  return e;
};

/**
 * Craetes a new button element.
 * @param {string} text The button text.
 * @param {function} click The button click callback.
 * @returns Newly created JQry button element.
 */
const Button = (text, click) => {
  const b = jqe("button").text(text);
  if (typeof click === "function") b.click(click);
  return b;
};

/** Creates a new Fomantic Container div */
const Container = callback => jqe("div", callback).addClass("ui container");

/** Creates a new Fomantic Grid div */
const Grid = () => Container().addClass("stackable grid");

/** Object holding different input element creation functions. */
const Input = {
  /** Create a new text input with the given name and placeholder text. */
  Text: (name, placeholder) => {
    return jqe("input")
      .attr("name", name)
      .attr("placeholder", placeholder)
      .addClass("ui input")
      .attr("type", "text");
  },
  /**
   * A Tag is a text-element which is removed on click.
   * @param {string} text The text of the tag
   * @param {function} callback Runs on click, before the tag is removed.
   * @returns A new Tag element.
   */
  Tag: (text, callback) => {
    return jqe("div")
      .addClass("tag")
      .text(text)
      .click(tag => {
        if (typeof callback === "function") callback($(tag.target));
        tag.target.remove();
      });
  },
  /**
   * @returns A tag with the given text & a callback which removes
   * the allergen from the user session.
   */
  AllergenTag: text => {
    return Input.Tag(text, e => user.removeAllergen(e.text().toLowerCase()));
  },
  /**
   * @param {function} click receives the text input element.
   */
  TextLabeledButton: (labelText, placeholder, click, val) => {
    const w = jqe("div").addClass("ui action input");
    const i = jqe("input")
      .attr("type", labelText)
      .attr("placeholder", placeholder)
      .val(val);
    const b = Button(labelText, () => click(i));
    return w.append(i, b);
  }
};

/**
 * Creates a Fomantic (FA) icon element.
 * @param {string} name Icon name
 */
const Icon = name => jqe("i").addClass(`icon ${name}`);

/**
 * Creates a new Step wrapper div.
 * @param  {...any} steps
 */
const StepWrapper = (...steps) => {
  return jqe("div")
    .addClass("ui steps three")
    .append(...steps);
};

/**
 * Creates a new Fomantic Step.
 * @param {string} icon fomantic icon name
 * @param {string} title step title
 * @param {string} description step description
 */
const Step = (icon, title, description) => {
  const base = jqe("div").addClass("ui step");
  const content = jqe("div").addClass("content");
  content.append(
    jqe("div")
      .addClass("title")
      .text(title)
  );
  content.append(
    jqe("div")
      .addClass("description")
      .text(description)
  );
  if (icon) base.append(Icon(icon));
  base.append(content);
  return base;
};

/**
 * Creates a new Form element with the given `onSubmit` function.
 * The `onSubmit` function receives an object of mapped values
 * from
 * @param {function} onSubmit
 * @returns A new Form element.
 */
const Form = onSubmit => {
  return jqe("form").on("submit", function(e) {
    e.preventDefault();
    const map = {};
    const v = $(this).serializeArray();
    v.forEach(i => (map[i.name] = i.value));
    onSubmit(map);
  });
};

/** Creates a clickable Fomantic Icon for toggling the current theme. */
const ThemeToggler = () => {
  const icon = Icon(theme.current().togglerIcon).addClass("mode-toggler");
  icon.click(e => {
    $(e.target).removeClass(theme.current().togglerIcon);
    theme.toggle();
    $(e.target).addClass(theme.current().togglerIcon);
  });
  return icon;
};

const Navbar = () => {
  const base = jqe("nav").addClass("navbar");
  const inner = Container();
  base.append(inner);
  const brand = jqe("h2")
    .text(ProjectInfo.name)
    .addClass("brand");
  inner.append(brand);
  inner.append(ThemeToggler());
  return base;
};

const GoogleMap = () => {
  const base = jqe("div")
    .attr("id", "map")
    .addClass("map-wrapper");

  const script = jqe("script")
    .attr("async", true)
    .attr("defer", true)
    .attr("type", "text/javascript")
    .attr("src", MapsSpec.getImportUri());

  base.append(script);

  return base;
};

const Footer = step => {
  const base = jqe("footer").addClass("footer");
  const cont = Container();
  const grid = Grid();
  cont.append(grid);
  const btnCol = jqe("div").addClass(`column eight wide`);
  grid.append(btnCol);

  if (step > 0) {
    btnCol.append(Button("Chnage Restaurant", () => render(HomePage())));
  }
  if (step > 1) {
    btnCol.append(Button("Change Allergens", () => render(AllergensPage())));
  }

  const brand = jqe("h4")
    .text("AllergicToThat")
    .click(() => window.open(ProjectInfo.srcUri, "_blank"));

  grid.append(
    jqe("div")
      .addClass(`column eight wide`)
      .append(brand)
  );

  return base.append(cont);
};

/**
 * @param {string} name The name of the page.
 * @param {function} init a function passed 1 argument, the page Container.
 */
const Page = (name, step, init) => {
  if (typeof init !== "function") {
    throw new Error("Page init must be a function");
  } else if (typeof name !== "string") {
    throw new Error("Page must have name");
  }
  // Create page wrapper
  const _page = jqe("div")
    .addClass("page")
    .attr("page-name", name);

  // Create content container
  const _pageBody = Container()
    .attr("id", "body-container")
    .addClass("centered middle")
    .css({ "margin-top": "1em", "min-height": "100%" });

  // Add steps to content container
  const stepWrapper = StepWrapper(
    Step(
      "store",
      "Choose a Restaurant",
      "Click on the map below to select a place to eat"
    ).addClass(`${step === 0 ? "" : "not-"}active`),
    Step(
      "skull crossbones",
      "Tell  us what you can’t eat",
      "Enter your allergens below"
    ).addClass(`${step === 1 ? "" : "not-"}active`),
    Step(
      "search",
      "Enter Items from the Menu",
      "Enter an item from the menu and check below to see the ingredients"
    ).addClass(`${step === 2 ? "" : "not-"}active`)
  ).css({ "margin-bottom": "2em" });

  _pageBody.append(stepWrapper);

  // Run init on content container
  init(_pageBody);

  // Add page container to paeg wrapper
  _page.append(Navbar(), _pageBody, Footer(step));
  // return page content container
  return _page;
};

const HomePage = () =>
  Page("home", 0, p => {
    // TODO! Get rid of this when we can use MAPs events
    const storeInput = Input.TextLabeledButton(
      "NEXT",
      "Where do you want to eat?",
      input => {
        console.log(input.val());
        if (input.val().length > 1) {
          user.store = input.val();
          render(
            user.allergens.length === 0 ? AllergensPage() : ItemSearchPage()
          );
        }
      },
      user.store
    );
    p.append(storeInput);
  });

const AllergensPage = () =>
  Page("allergens", 1, p => {
    const allergenInput = Input.TextLabeledButton(
      "Add Allergen",
      "what's off the menu?",
      i => {
        if (i.val() > "" && !user.allergens.includes(i.val().toLowerCase())) {
          tagBox.append(Input.AllergenTag(i.val()));
          user.addAllergen(i.val().toLowerCase());
          i.val("");
        }
      }
    ).css({ "margin-top": "3em" });
    const tagBox = jqe("div").addClass("tag-box");

    // Add existing allergens to tagBox
    user.allergens.forEach(a => tagBox.append(Input.AllergenTag(a)));

    const nextBtn = Button("Done", () => render(ItemSearchPage())).css({
      "margin-top": "1em",
      width: "100%",
      "max-width": "200px"
    });

    p.append(allergenInput, tagBox, nextBtn);
  });

const ItemSearchPage = () => {
  const resultBox = jqe("div").addClass("search-result");

  const Ingredient = (text, flagged) => {
    return jqe("span")
      .attr("data-flagged", flagged ? 1 : -1)
      .addClass(`ui text ${flagged ? "red large" : ""}`)
      .text(`${text}, `);
  };

  /**
   *
   * @param {*} name
   * @param {Array<string>} ingredients
   */
  const SetResults = (name, ingredients) => {
    resultBox.empty();
    const header = jqe("h3").text(`Top Result for: "${name}"`);
    const ing = ingredients
      .map(i =>
        Ingredient(
          i,
          i.split(/\s+/).some(s => user.allergens.includes(s.toLowerCase()))
        )
      )
      .sort((a, b) => b.attr("data-flagged") - a.attr("data-flagged"));

    resultBox.append(header, jqe("hr"), ...ing);
  };

  return Page("item-search", 2, p => {
    const storeName = jqe("h2")
      .text(user.store)
      .css({ "margin-top": "0", "text-decoration": "underline" });
    const searchBox = Input.TextLabeledButton(
      "Search",
      "Search Menu Item",
      input => {
        const v = input.val().trim();
        FdcSpec.search(user.store, ...v.split(/\s+/)).then(sr => {
          sr.results = sr.results.filter(
            r => typeof r.ingredients_raw === "string"
          );
          if (
            sr.results.length == 0 ||
            typeof sr.results[0].ingredients_raw !== "string"
          ) {
            resultBox.empty().append(`Nothing found for "${v}"`);
          } else {
            SetResults(sr.results[0].description, sr.results[0].ingredients);
          }
        });
      }
    ).css({
      "margin-bottom": "2em"
    });

    p.append(storeName, searchBox, resultBox);
  });
};
