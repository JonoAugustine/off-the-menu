const Container = callback => {
  return E("div").addClass("ui container");
};

const Input = {
  Text: () => {
    return E("input")
      .addClass("ui input large mat-input")
      .attr("type", "text");
  }
};

const Navbar = () => {
  const base = E("nav").addClass("navbar");
  const inner = Container();
  base.append(inner);
  const brand = E("h2")
    .text(Company.name)
    .addClass("brand");
  inner.append(brand);
  return base;
};

const HomePage = () => {
  const container = Container().css({ "margin-top": "1em" });
  const test_input = Input.Text();
  return container.append(test_input);
};

$(document).ready(() => show(Navbar));
