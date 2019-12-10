import { elementOf } from "..";
import { Header } from "../Text";
import { Container } from "../Containers";

import "./navbar.scss";

const Navbar = () => {
  const base = elementOf("nav").addClass("navbar");
  const container = Container();

  const brand = elementOf("a")
    .addClass("brand")
    .attr("href", "#")
    .text("Off The Menu");

  // TODO Profile dropdown
  const profileMenu = Header(4, "Profile").addClass("dropdown");

  container.append(brand, profileMenu);

  base.append(container);
  return base;
};

export default Navbar;
