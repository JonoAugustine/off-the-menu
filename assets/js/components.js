const theme = {
  light: {
    location: "./assets/style/light.css",
    primary: "#f9f9f9",
    togglerIcon: "moon"
  },
  dark: {
    location: "./assets/style/dark.css",
    primary: "#1f1f1f",
    togglerIcon: "sun"
  },
  link: function() {
    return $("#theme-link");
  },
  load: function() {
    // Attempt to load & set theme from local storage
    const lst = localStorage["theme"];
    if (typeof lst === "string" && lst.includes("dark")) {
      this.link().attr("href", this.dark.location);
    } else {
      this.link().attr("href", this.light.location);
    }
  },
  toggle: function() {
    const nTheme = this.link()
      .attr("href")
      .includes("light")
      ? this.dark.location
      : this.light.location;
    this.link().attr("href", nTheme);
    localStorage["theme"] = nTheme;
  },
  current: function() {
    return this.link()
      .attr("href")
      .includes("dark")
      ? this.dark
      : this.light;
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

const Button = (text, click) => {
  const b = jqe("button").text(text);
  if (typeof click === "function") b.click(click);
  return b;
};

const Container = callback => jqe("div", callback).addClass("ui container");

const Input = {
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
  TextLabeledButton: (labelText, placeholder, click) => {
    const w = jqe("div").addClass("ui action input");
    const i = jqe("input")
      .attr("type", labelText)
      .attr("placeholder", placeholder);
    const b = Button(labelText, () => click(i));
    return w.append(i, b);
  }
};

/**
 * Return a Fomantic (FA) icon element.
 * @param {string} name Icon name
 */
const Icon = name => jqe("i").addClass(`icon ${name}`);

const StepWrapper = (ordered, ...steps) => {
  return jqe("div")
    .addClass(`ui steps three ${ordered === false ? "" : "ordered"}`)
    .append(...steps);
};

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

const ThemeToggler = current => {
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
    false,
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
  );

  _pageBody.append(stepWrapper);

  // Run init on content container
  init(_pageBody);

  // Add page container to paeg wrapper
  _page.append(Navbar(), _pageBody);
  // return page content container
  return _page;
};

const HomePage = Page("home", 0, p => {
  // TODO! Get rid of this when we can use MAPs events
  const storeInput = Input.TextLabeledButton(
    "NEXT",
    "Where do you want to eat?",
    input => {
      user.store = input.val();
      render(AllergensPage);
    }
  );
  p.append(storeInput);
});

const AllergensPage = Page("allergens", 1, p => {
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
  const tagBox = jqe("div")
    .addClass("tag-box")
    .css({ "margin-top": "2em" });
  // Add existing allergens to tagBox
  user.allergens.forEach(a => tagBox.append(Input.AllergenTag(a)));

  const nextBtn = Button("Done", () => render(ItemSearchPage)).css({
    "margin-top": "1em",
    width: "100%",
    "max-width": "200px"
  });

  p.append(allergenInput, tagBox, nextBtn);
});

const ItemSearchPage = Page("item-search", 2, p => {});
