import { Div } from "../Containers";
import { Header } from "../Text";

import "./step.scss";

/**
 * TODO
 * @param {string} title
 * @param {string} description
 * @param {boolean} active
 * @returns {JQuery<HTMLDivElement>}
 */
const Step = (title, description, icon, active) => {
  const base = Div("div")
    .addClass(`ui step ${active ? "active" : "not-active"}`)
    .append(
      Div()
        .addClass("content")
        .append(
          Div()
            .text(title)
            .addClass("title"),
          Div()
            .text(description)
            .addClass("description")
        )
    );
  if (icon) base.prepend(icon);
  base.toggle = () => base.toggleClass("active");
  return base;
};

export default Step;
