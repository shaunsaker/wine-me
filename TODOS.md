# TODOS

- After check in, rate and answer questions

- If I just have checked in and I have not already answered or declined to answer questions, show me the following:

- Get these from categories in db

  - Associated question with category
  - E.g.

  ```js
  categories: {
      W: {
        name: 'Accessible', // acts as the category id
        question_text: 'Was it wheelchair accessible?',
        options: ['Yes', 'No'], // null indicates user string input is required
        order: 5,
        validation: {
          max: null, // maximum input value, if applicable
          min: null, // minimum input value, if applicable
          type: 'string', // expected value type (string, number)
        }
      },
      X: {
        name: 'Child friendly',
        question_text: 'Was it child friendly?',
        options: ['Yes', 'No'],
        order: 3,
        validation: {
          max: null,
          min: null,
          type: 'string',
        }
      },
      Y: {
        name: 'Serves food',
        question_text: 'Did they serve food?',
        options: ['Yes', 'No'],
        order: 4,
        validation: {
          max: null,
          min: null,
          type: 'string',
        }
      },
      Z: {
        name: 'Price',
        question_text: 'How much did your wine tasting cost?',
        options: null,
        order: 2,
        validation: {
          max: null,
          min: 0,
          type: 'string',
        }
      },
      V: {
        name: 'Rating',
        question_text: 'How was your experience?',
        options: null,
        order: 1,
        validation: {
          max: 5,
          min: 1,
          type: 'number',
        }
      },
    }
  ```

  ```js
  userFeedback: {
    X: {
      category_name: 'Serves food',
      value: 'Yes',
      uid: '12345678',
      place_id: '12345678',
      date: 12345678,
    },
    Y: {
      category_name: 'Price',
      value: 80,
      uid: '12345678',
      place_id: '12345678',
      date: 12345678,
    },
    Z: {
      category_name: 'Rating',
      value: 4,
      uid: '12345678',
      place_id: '12345678',
      date: 12345678,
    },
  }
  ```

- Show ratings on PlaceCards
- Search by categories (Child Friendly, Serves Food) - if is_filterable
- Show the datestamp of when you last visited a place
- Display average price on Place page

## BUGS

- Refactor store so that we can delete places, check ins etc (update RNBP)

### DIFFUCULT TO REPRODUCE/SOLVE

- After receiving update on iOS, redux-persist loader just loaded indefinitely
- If I delete a place or search area in the db, it does not reflect in the persisted store

## ENHANCEMENTS

### CODE OPTIMISATIONS

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
