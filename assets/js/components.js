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

const Inputs = {
  Text: callback => {
    return jqe("input", callback)
      .addClass("ui input")
      .attr("type", "text");
  }
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

  const allergenInput = Inputs.Text();
  const tagBox = jqe("div").addClass("tag-box");
  body.append(allergenInput, tagBox);

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
