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
    localStorage["theme"] = nTheme.location;
  },
  current: function() {
    return this.link()
      .attr("href")
      .includes("dark")
      ? this.dark
      : this.light;
  }
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
        if (typeof callback === "function") callback(tag);
        tag.target.remove();
      });
  }
};

/**
 * Return a Fomantic (FA) icon element.
 * @param {string} name Icon name
 */
const Icon = name => jqe("i").addClass(`icon ${name}`);

const ToolTip = (element, text) => element.attr("data-tooltip", text);

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
    .attr("src", MapsApi.getImportUri());

  base.append(script);

  return base;
};

const HomePage = () => {
  const wrapper = jqe("div").css({ "min-height": "100%" });

  wrapper.append(Navbar);

  const body = Container()
    .addClass("centered")
    .css({ "margin-top": "1em", "min-height": "100%" });

  const allergenInput = Input.Text("allergen", "what's off the menu?").attr(
    "id",
    "allergen-input"
  );

  ToolTip(allergenInput, "Enter Allergens Here");

  const tagBox = jqe("div").addClass("tag-box");

  const allergenForm = Form(v => {
    if (v.allergen > "") {
      tagBox.append(Input.Tag(v.allergen));
      allergenInput.val("");
    }
  });

  allergenForm.append(allergenInput, tagBox);

  body.append(allergenForm);

  body.append(GoogleMap());

  wrapper.append(body);

  return wrapper;
};

/** Root div to manipulate. */
const root = () => $("#root");

/**
 * Empties root element and appends child element.
 * @param {*} component
 * @returns The root element with given child appended.
 */
const render = component => {
  return root()
    .empty()
    .append(component());
};

/***********************
 **********************/

let currentPage = null;

$(document).ready(() => {
  currentPage = "home";

  theme.load();

  render(HomePage);
});
