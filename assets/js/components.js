const theme = {
  light: {
    location: "./assets/style/light.css",
    primary: "#f9f9f9"
  },
  dark: {
    location: "./assets/style/dark.css",
    primary: "#1f1f1f"
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
  }
};

theme.toggle();

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
  Text: name => {
    return jqe("input")
      .attr("name", name)
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

const Navbar = () => {
  const base = jqe("nav").addClass("navbar");
  const inner = Container();
  base.append(inner);
  const brand = jqe("h2")
    .text(ProjectInfo.name)
    .addClass("brand");
  inner.append(brand);
  return base;
};

const HomePage = () => {
  const wrapper = jqe("div");

  wrapper.append(Navbar);

  const body = Container()
    .addClass("centered")
    .css({ "margin-top": "1em" });

  const allergenInput = Input.Text("allergen")
    .attr("placeholder", "what's off the menu?")
    .attr("id", "allergen-input");
  const tagBox = jqe("div").addClass("tag-box");

  // ! testing
  tagBox.append(Input.Tag("Religion"));

  const allergenForm = Form(v => {
    if (v.allergen > "") tagBox.append(Input.Tag(v.allergen));
    allergenInput.val("");
  });

  allergenForm.append(allergenInput, tagBox);

  body.append(allergenForm);

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
const render = component =>
  root()
    .empty()
    .append(component);

/***********************
 **********************/

let currentPage = null;

$(document).ready(() => {
  currentPage = "home";

  theme.load();

  render(HomePage());
});
