import { elementOf } from "..";

/**
 *
 * @param {boolean} checked
 * @returns {JQuery<HTMLInputElement>}
 */
const Checkbox = checked => {
  return elementOf("input")
    .attr("type", "checkbox")
    .attr("checked", checked ? true : false);
};

export default Checkbox;
