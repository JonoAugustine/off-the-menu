import { elementOf } from "..";

/**
 *
 * @param {number} size
 * @returns {JQuery<HTMLHeadingElement>}
 */
const Header = (size, text) => {
  return elementOf(`h${size}`).text(text);
};

export default Header;
