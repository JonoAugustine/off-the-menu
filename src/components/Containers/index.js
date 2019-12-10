import { elementOf } from "../";

/** @returns {JQuery<HTMLDivElement>} */
const Div = callback => elementOf("div", callback);

/** @returns {JQuery<HTMLDivElement>} Div element with class `container`. */
const Container = callback => elementOf("div", callback).addClass("container");

export { Div, Container };
