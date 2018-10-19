import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, Keyboard } from 'react-native';

import utils from '../../../utils';
import styles from './styles';

import Lightbox from '../../../components/Lightbox';
import PlaceQuestionsList from '../../../components/PlaceQuestionsList';
import Button from '../../../components/Button';
import Link from '../../../components/Link';

export class PlaceQuestionsModal extends React.Component {
  constructor(props) {
    super(props);

    this.onSetValue = this.onSetValue.bind(this);
    this.validateValue = this.validateValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSkip = this.onSkip.bind(this);
    this.saveUserFeedback = this.saveUserFeedback.bind(this);
    this.dismissKeyboard = this.dismissKeyboard.bind(this);
    this.setSlideIndex = this.setSlideIndex.bind(this);
    this.setSystemMessage = this.setSystemMessage.bind(this);
    this.navigate = this.navigate.bind(this);

    this.state = {
      slideIndex: 0, // start at 0 duh
    };
  }

  static propTypes = {
    place: PropTypes.shape({ name: PropTypes.string }).isRequired, // passed by Place page
    categories: PropTypes.shape({}).isRequired,
    uid: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {};

  onSetValue(categoryID, value) {
    const { categories } = this.props;
    const rules = categories[categoryID].validation;
    const isValidValue = this.validateValue(value, rules);

    if (isValidValue) {
      this.setValue(categoryID, value);
    }
  }

  validateValue(value, rules) {
    // Attempt to invalidate the value based on each of the rules given (type, min and max)
    if (value === NaN) {
      // Immediately return false if the value is not a number when it should have been

      return false;
    }

    if (rules.type && typeof value !== rules.type) {
      return false;
    }

    if ((rules.min || rules.min === 0) && !(value >= rules.min)) {
      return false;
    }

    if ((rules.max || rules.max === 0) && !(value <= rules.max)) {
      return false;
    }

    return true;
  }

  setValue(categoryID, value) {
    // Will set the value of the categoryName on state
    // ie. this.state = { rating : 3 };
    const { state } = this;
    const { categories } = this.props;
    const categoryName = categories[categoryID].name;

    state[categoryName] = value;

    this.setState(state);
  }

  onSubmit() {
    const { slideIndex } = this.state;
    const { categories } = this.props;
    const isLastSlide = slideIndex === Object.keys(categories).length - 1;

    this.dismissKeyboard();
    this.saveUserFeedback();

    if (isLastSlide) {
      this.setSystemMessage('Thanks for the feedback.');
      this.navigate(); // pop the scene
    } else {
      const nextSlideIndex = slideIndex + 1;

      this.setSlideIndex(nextSlideIndex);
    }
  }

  onSkip() {
    // Go to the next slide
    const { slideIndex } = this.state;
    const nextSlideIndex = slideIndex + 1;

    this.setSlideIndex(nextSlideIndex);
  }

  saveUserFeedback() {
    // Save the user feedback for the current slide index
    const { state } = this;
    const { slideIndex } = state;
    const { dispatch, uid, place, categories } = this.props;

    // Get the relevant category name from the slideIndex
    // Convert categories object to array
    // Sort by order field
    const categoriesArray = utils.arrays.sortArrayOfObjectsByKey(
      utils.objects.convertObjectToArray(categories),
      'order',
    );
    const categoryName = categoriesArray[slideIndex].name;

    const value = state[categoryName];
    const document = {
      category_name: categoryName,
      value,
      uid,
      place_id: place.id,
      date: Date.now(),
    };

    dispatch({
      type: 'addDocument',
      meta: {
        pathParts: ['user_feedback'],
      },
      payload: {
        document,
      },
    });
  }

  dismissKeyboard() {
    Keyboard.dismiss();
  }

  setSlideIndex(slideIndex) {
    this.setState({
      slideIndex,
    });
  }

  setSystemMessage(message) {
    const { dispatch } = this.props;

    dispatch({
      type: 'SET_SYSTEM_MESSAGE',
      payload: {
        message,
      },
    });
  }

  navigate(page, props) {
    utils.app.navigate(page, props);
  }

  render() {
    const { state } = this;
    const { slideIndex } = state;
    const { place, categories } = this.props;

    // Convert categories object into array
    // Sort the array by order
    // Add value from state (if any)
    const categoriesArray = utils.arrays
      .sortArrayOfObjectsByKey(utils.objects.convertObjectToArray(categories), 'order')
      .map((item) => {
        return {
          ...item,
          value: state[item.name],
        };
      });

    // Only the last slide should say Submit
    const isLastSlide = slideIndex === categoriesArray.length - 1;
    const submitButtonText = isLastSlide ? 'Submit' : 'Next';

    // Is there a value in state for the current slide's category name
    const isSubmitButtonDisabled = !state[categoriesArray[slideIndex].name];

    const skipButtonComponent = !isLastSlide && (
      <Link handlePress={this.onSkip} text="Skip" testID="placeQuestionsModal.button.skip" />
    );

    return (
      <Lightbox title={place.name}>
        <View style={styles.container}>
          <PlaceQuestionsList
            data={categoriesArray}
            handleSetValue={this.onSetValue}
            slideIndex={slideIndex}
          />

          <View style={styles.submitButtonContainer}>
            <Button
              primary
              text={submitButtonText}
              handlePress={this.onSubmit}
              disabled={isSubmitButtonDisabled}
              testID="placeQuestionsModal.button.submit"
            />
          </View>

          <View style={styles.footerContainer}>
            <Text style={styles.countText}>{`${slideIndex + 1} / ${categoriesArray.length}`}</Text>

            {skipButtonComponent}
          </View>
        </View>
      </Lightbox>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.appData.categories,
    uid: state.user.uid,
  };
}

export default connect(mapStateToProps)(PlaceQuestionsModal);
