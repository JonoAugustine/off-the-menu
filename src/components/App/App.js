import { Div, Container } from "../Containers";
import { Navbar } from "../Navbar";
import { Toggler } from "../Input";
import { ThemeController } from "../../api";
import { Icon } from "../Image";
import { StepList, Step } from "../Steps";

import "./app.scss";

const App = () => {
  const base = Div().attr("id", "app");
  const page = Container();

  const steps = StepList(
    Step(
      "Choose a Restaurant",
      "Click on the map to select a place to eat",
      Icon().addClass("store"),
      true
    ),
    Step(
      "Tell us what you can’t eat",
      "Enter your allergens below",
      Icon().addClass("skull crossbones")
    ),
    Step(
      "Enter Items from the Menu",
      "Enter an item from the menu to check the ingredients",
      Icon().addClass("search")
    )
  );
  page.append(steps);

  return base.append(Navbar(), page);
};

export default App;
