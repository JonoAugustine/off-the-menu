import { TextInput } from ".";

import "./input.scss";
import { elementOf } from "..";
import Checkbox from "./Checkbox";

/**
 *
 * @param {function} action
 * @param {boolean} toggled
 * @returns {JQuery<HTMLElement>}
 */
const Toggler = (action, toggled) => {
  toggled = toggled ? true : false;
  const label = elementOf("label")
    .addClass("toggler")
    .change(action);
  const input = Checkbox(toggled);
  const span = elementOf("span").addClass("slider");
  return label.append(input, span);
};

export default Toggler;
