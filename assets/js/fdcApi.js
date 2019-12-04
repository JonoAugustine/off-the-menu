class FdcSearchResult {
  /**
   * @param {*} raw
   * @param {string} store
   */
  constructor(raw, store) {
    store = store.replace(/[^A-Z0-9]/gi, "").toLowerCase();
    this.request = raw.foodSearchCriteria;
    this.raw = raw;
    this.responseCount = raw.totalHits;
    this.results = raw.foods
      //      .filter(fd =>
      //        fd.description
      //          .replace(/[^A-Z0-9]/gi, "")
      //          .toLowerCase()
      //          .includes(store)
      //      )
      .map(fd => {
        const dv = fd.description.split(",");
        dv.shift();
        fd.ingredients = (fd.ingredients ? fd.ingredients : "") + dv.join(" ");
        return {
          id: fd.fdcId,
          description: fd.description.toLowerCase(),
          ingredients: fd.ingredients
            ? fd.ingredients
                .split(/[^a-z0-9\s+\-]/gi)
                .map(s => s.trim().toLowerCase())
                .filter(s => s.length > 0)
            : null,
          ingredients_raw: fd.ingredients ? fd.ingredients : null,
          /** @returns {Promise<*>} Promise awaiting food item response from FDC API. */
          getData: function() {
            return FdcSpec.getItem(this.id);
          }
        };
      });
  }
}

class FdcFoodItem {
  constructor(raw) {
    this.raw = raw;
  }
}

const FdcSpec = {
  key: "dfPdM4ko8xAaxTxfdOAgxdJKbfbPX9hIj1bNBv64",
  baseUri: "https://api.nal.usda.gov/fdc/v1",
  searchUri: () => `${FdcSpec.baseUri}/search?api_key=${FdcSpec.key}`,
  /**
   *
   * @param {string} itemID The food item's FDC ID
   */
  itemUri: itemID => `${FdcSpec.baseUri}/${itemID}?api_key=${FdcSpec.key}`,
  /**
   * Makes a search request to the FDC API.
   * @param {string} store The food spot in which to search for
   * @param {string} tokens search tokens
   * @returns {Promise<FdcSearchResult>} matching search.json model
   */
  search: (store, ...tokens) => {
    store = store.toLowerCase();
    return $.ajax({
      type: "POST",
      url: FdcSpec.searchUri(),
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        generalSearchInput: [store, ...tokens].join(" ")
      })
    }).then(result => {
      console.log("FDC API Search Result (raw)", result);
      const r = new FdcSearchResult(result, store);
      console.log("FdcSearchResult", r);
      return r;
    });
  },
  getItem: itemID => {
    return $.ajax({
      type: "GET",
      url: FdcSpec.itemUri(itemID),
      headers: { "Content-Type": "application/json" }
    }).then(r => {
      console.log("FDC API Item Get Result (raw)", r);
      return new FdcFoodItem(r);
    });
  }
};
