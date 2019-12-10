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

export { ThemeController };
