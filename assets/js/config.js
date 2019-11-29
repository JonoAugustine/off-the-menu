const User = {
  allergens: [],
  geolocation: null
};

const ProjectInfo = {
  name: "AllergicToThat"
};

/** @returns true if the given object contains the given target. Includes sub-objects. */
const contains = (target, any) => {
  for (const k in any) {
    if (k === target) {
      return true;
    } else if (any[k] === target) {
      return true;
    } else if (typeof any[k] === "object") {
      if (contains(target, any[k])) {
        return true;
      }
    } else return false;
  }
};
