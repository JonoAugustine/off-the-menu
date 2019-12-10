import { toWords } from "number-to-words";

import { Div } from "../Containers";

/**
 *
 * @param  {...JQuery<HTMLDivElement>} steps
 * @returns {JQuery<HTMLDivElement>}
 */
const StepList = (...steps) => {
  const stepList = Div("div")
    .addClass(`ui steps ${toWords(steps.length)}`)
    .append(...steps);
  return stepList;
};

export default StepList;
