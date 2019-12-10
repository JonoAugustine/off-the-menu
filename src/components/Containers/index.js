import { elementOf } from "../";
import Container from "./Container";

import "./container.scss";

/** @returns {JQuery<HTMLDivElement>} */
const Div = callback => elementOf("div", callback);

export { Div, Container };
