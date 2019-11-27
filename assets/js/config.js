/** Session class used to hold session data. */
class SessionInfo {
  allergens = [];
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
    this.save;
  }

  save() {
    localStorage["user"] = JSON.stringify(this);
  }
}

const loadSession = () => {
  return localStorage["user"]
    ? JSON.parse(localStorage["user"])
    : new SessionInfo();
};

const user = loadSession;

const ProjectInfo = {
  name: "AllergicToThat"
};
