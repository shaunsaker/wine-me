# TODOS

- PlaceQuestions:

  - Rate wine, setting and service
  - Unit tests

- Use firebase functions to append these categories, price info, rating info to places
- Show ratings on PlaceCards (if any)
- Display average price on Place page
- Search by categories (Child Friendly, Serves Food)
- Show the datestamp of when you last visited a place

## BUGS

- AppData reducers don't allow for deleting object properties

### DIFFUCULT TO REPRODUCE/SOLVE

- After receiving update on iOS, redux-persist loader just loaded indefinitely
- If I delete a place or search area in the db, it does not reflect in the persisted store

## ENHANCEMENTS

### CODE OPTIMISATIONS

- SearchAreaLabelList should have SearchAreaLabel in folder
- CI

## FEATURE REQUESTS

These should be applicable to PLACES in general. Ie. Buy wines is not a good generic feature.

- Filter on price once enough data - SHAUN
- Search "Is Open" tag - SHAUN
- Photographer friendly places (there is a list flying around) - SHAUN
- Request location permission again if not granted - SHAUN
- Save unique device ID (for easy data retrieval if necessary) - SHAUN
- Facebook sign in - SHAUN
- Buy wines - ALEX
- Line items in Profile for quicker reference - JJ
- Show me how many places I've checked into compared to the total - SHAUN
- See the number of a check ins at a place - SHAUN
- Share wine farm - SHAUN
- Non WC wine farms - PAUL THIEL
  - Gauteng
  - Upington
- Tappable photos - WADE
- Being able to uncheck in to a place - WADE

## FOR IOS SCREENSHOTS

screencapture -R957,95,297,530 screenshot.png
