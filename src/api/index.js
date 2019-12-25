// Currently non-functional
const ThemeController = {
  light: false,
  current: function() {
    return this.light ? "light" : "dark";
  },
  next: function() {
    return this.light ? "dark" : "light";
  },
  toggle: function() {
    const next = this.next();
    this.light = next == "light";
    document.body.style.setProperty("--light-theme", this.light);
  }
};

const ProjectInfo = {
  name: "Off The Menu",
  slug: "otm",
  version: "0.2.0"
};

export { ThemeController };
