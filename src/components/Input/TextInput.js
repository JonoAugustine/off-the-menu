import { elementOf } from "..";

/**
 *
 * @param {string} placeholder
 * @param {string} initialValue
 * @returns {JQuery<HTMLInputElement>}
 */
const TextInput = (placeholder, initialValue) => {
  return elementOf("input")
    .attr("type", "text")
    .attr("placeholder", placeholder)
    .val(initialValue ? initialValue : "");
};

export default TextInput;
