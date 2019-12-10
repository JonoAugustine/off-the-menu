import { Div, Container } from "../Containers";
import { Navbar } from "../Navbar";
import { Toggler } from "../Input";
import { ThemeController } from "../../api";

import "./app.scss";

const App = () => {
  const base = Div().attr("id", "app");
  const page = Container();
  return base.append(Navbar(), page);
};

export default App;
