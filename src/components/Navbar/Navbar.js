import { elementOf } from "..";
import { Header } from "../Text";
import { Container, Div } from "../Containers";

import "./navbar.scss";

const Navbar = () => {
  const base = elementOf("nav").addClass("navbar");
  const container = Container();

  const brand = Div()
    .addClass("brand")
    .append(
      elementOf("a")
        .attr("href", "#")
        .text("Off The Menu")
    );

  // TODO Profile dropdown
  const menu = Div().addClass("nav-menu");
  const profileMenu = Header(3, "Profile").addClass("dropdown");

  menu.append(profileMenu);

  container.append(brand, menu);

  base.append(container);
  return base;
};

export default Navbar;
