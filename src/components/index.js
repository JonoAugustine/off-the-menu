import $ from "jquery";

/** @returns Root div to manipulate. */
const root = () => $("#root");

/**
 * Empties root element and appends child element.
 * @param {JQuery<HTMLElement>} component child DOM element
 * @returns The root element with given child appended.
 */
const render = component => {
  const name = component.attr("page-name");
  if (name > "") user.setPage(name);
  return root()
    .empty()
    .append(component);
};

/**
 * Simplified DOM Element creation. Same as `$("<div>")`
 * but does not need chevrons.
 * @param {String} tag
 * @returns {JQuery<HTMLElement>} A new JQuery DOM Element of the given tag.
 */
const elementOf = (tag, callback) => {
  const e = $(`<${tag}>`);
  if (typeof callback === "function") callback(e);
  return e;
};

export { root, render, elementOf };
