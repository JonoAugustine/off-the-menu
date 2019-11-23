

const uri =
  "https://api.nal.usda.gov/fdc/v1/search?api_key=dfPdM4ko8xAaxTxfdOAgxdJKbfbPX9hIj1bNBv64";

$.ajax({
  type: "POST",
  url: uri,
  headers: { "Content-Type": "application/json" },
  data: JSON.stringify({ generalSearchInput: "Chedder Cheese" })
})
 


.then(function(response) {
console.log(response);
});