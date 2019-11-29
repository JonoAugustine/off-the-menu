class FdcSearchResult {
  /**
   * @param {*} raw
   * @param {string} store
   */
  constructor(raw, store) {
    store = store.replace(/[^A-Z]/gi, "").toLowerCase();
    this.request = raw.foodSearchCriteria;
    this.raw = raw;
    this.responseCount = raw.totalHits;
    this.results = raw.foods
      .filter(fd =>
        fd.description
          .replace(/[^A-Z]/gi, "")
          .toLowerCase()
          .includes(store)
      )
      .map(fd => {
        return {
          id: fd.fdcId,
          description: fd.description.toLowerCase()
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
      return new FdcSearchResult(result, store);
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

FdcSpec.search("Wendys", "spicy", "chicken", "sandwich")
  .then(sr => FdcSpec.getItem(sr.results[0].id))
  .then(item => {
    console.time("X");
    console.log(item, contains("lactose", item));
    console.timeEnd("X");
  });
