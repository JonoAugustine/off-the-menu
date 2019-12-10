import { Div } from "../Containers";
import { GoogleMapsApi } from "../../api/Maps";

const Map = () => {
  let loaded = false;
  const wrapper = Div()
    .attr("id", "map")
    .addClass("map-wrapper")
    .on({
      DOMNodeInserted: function() {
        if (!loaded) {
          GoogleMapsApi.init();
          loaded = true;
        }
      }
    });
  return wrapper;
};

export default Map;
