const FdcSpec = {
  key: "dfPdM4ko8xAaxTxfdOAgxdJKbfbPX9hIj1bNBv64",
  baseUri: "https://api.nal.usda.gov/fdc/v1",
  searchUri: () => `${FdcSpec.baseUri}/search?api_key=${FdcSpec.key}`,
  /**
   *
   * @param {string} itemID The food item's FDC ID
   */
  itemUri: itemID => `${FdcSpec.baseUri}/${itemID}?api_key=${key}`,
  /**
   *
   * @param {*} raw
   * @param {string} store
   * @param {boolean} filtered
   */
  SearchResult: function(raw, store, filtered) {
    this.raw = raw;
    this.responseCount = raw.totalHits;
    this.results = filtered
      ? raw.foods
          .filter(fd => fd.description.toLowerCase().includes(store))
          .map(fd => ({ ...fd, description: fd.description.toLowerCase() }))
      : raw.foods;
    this.request = raw.foodSearchCriteria;
    this.pagination = {
      current: raw.page,
      total: raw.totalPages
    };
  },
  /**
   * Makes a search request to the FDC API.
   * @param {string} store The food spot in which to search for
   * @param {string} tokens search tokens
   * @returns Promise<result> matching search.json model
   */
  search: (store, filtered, ...tokens) => {
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
      return new FdcSpec.SearchResult(result, store, filtered);
    });
  },
  getItem: itemID => {
    return $.ajax({
      type: "GET",
      url: FdcSpec.itemUri(itemID),
      headers: { "Content-Type": "application/json" }
    });
  }
};

FdcSpec.search("Wendy's", true, "spicy", "chicken", "sandwich").then(sr =>
  console.log(sr)
);
