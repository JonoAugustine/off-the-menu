/** Session class used to hold session data. */
class SessionInfo {
  allergens = [];
  store = null;
  geolocation = null;
  page = null;

  addAllergen(allergen) {
    this.allergens.push(allergen);
    this.save();
  }

  removeAllergen(allergen) {
    this.allergens = this.allergens.filter(a => a != allergen);
    this.save();
  }

  setPage(name) {
    this.page = name;
    this.save();
  }

  save() {
    localStorage["user"] = JSON.stringify(this);
    console.log("session info updated", this);
  }
}

/**
 * @returns {SessionInfo}
 */
const loadSession = () => {
  console.log("Loading Session Info");
  const si = localStorage["user"]
    ? Object.setPrototypeOf(
        JSON.parse(localStorage["user"]),
        SessionInfo.prototype
      )
    : new SessionInfo();
  console.log("loaded session info", si);
  return si;
};

const user = loadSession();

const ProjectInfo = {
  name: "AllergicToThat"
};
