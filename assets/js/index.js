$(document).ready(() => {
  theme.load();

  switch (user.page) {
    case "home":
      render(HomePage);
      break;
    case "allergens":
      render(AllergensPage);
      break;
    case "search":
      break;
    default:
      render(HomePage);
  }
});
