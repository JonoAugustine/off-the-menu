import { Div, Container } from "../Containers";
import { Navbar } from "../Navbar";
import { Toggler } from "../Input";
import { ThemeController } from "../../api";

import "./app.scss";

const App = () => {
  const base = Div().attr("id", "app");
  const page = Container();
  page.append(Toggler(() => ThemeController.toggle(), ThemeController.light));
  return base.append(Navbar(), page);
};

export default App;
