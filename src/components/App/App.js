import { Div } from "../Containers";
import { Toggler } from "../Input";
import { ThemeController } from "../../api";

const App = () => {
  const base = Div().attr("id", "app");
  base.append(Toggler(() => ThemeController.toggle(), ThemeController.light));
  return base;
};

export default App;
