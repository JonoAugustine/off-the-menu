$(document).ready(() => {
  theme.load();

  switch (user.page) {
    case "home":
      render(HomePage);
      break;
    case "allergens":
      break;
    case "search":
      break;
    default:
      render(HomePage);
  }
});
