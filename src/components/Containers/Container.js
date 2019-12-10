import { Div } from ".";

/** @returns {JQuery<HTMLDivElement>} */
const Container = fluid => {
  return Div().addClass(`container ${fluid ? "fluid" : ""}`);
};

export default Container;
