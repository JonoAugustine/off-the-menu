# AllergicToThat

Jennifer Genes, Michael Artes, Jonathan Augustine

## Brief

### Project Goals

Create an application which allows users to filter local
restarounts by allergins present in menu items.

### Target Audience

## Roadmap

### Min. Viable Product

- Single Page
- User can input multiple allergins
- User can enter location by ZIP Code

- Show whether item has ingredients label or not

### Post MVP Goals

- Move FDC API calls to a server of our design to better protect the API key.
  - This would also make caching results simpler since a central (well... itermediate kinda)
    db would allow for repeated searches to be better handled
    (e.g., popular food spots will have faster response times)
- NLP for associating known allergens with associated chemicals and ingredients.

## Log

## Dependencies

Library:

- [JQuery](https://code.jquery.com/)

Style:

- [Fomantic UI](https://fomantic-ui.com/)

API:

- [FDC FoodData Central](https://fdc.nal.usda.gov/index.html)
- [Google Maps API](https://developers.google.com/maps/documentation)

## License

This project is shared under the MIT License.

Copyright (c) 2019 Jennifer Genes, Michael Artes, Jonathan Augustine
