import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import styles from './styles';

import StarRating from '../../StarRating';
import TextInput from '../../TextInput';
import Button from '../../Button';

const propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    validation: PropTypes.shape({
      type: PropTypes.string,
    }),
  }).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleSetValue: PropTypes.func,
};

const defaultProps = {};

const PlaceQuestion = ({ category, value, handleSetValue }) => {
  /*
    If category.is_rating
      Display StarRating
    Else if options
      Display two buttons
    Else
      Display text input
  */

  let inputComponent;

  if (category.is_rating) {
    inputComponent = (
      <View style={styles.starRatingContainer}>
        <StarRating rating={value} handlePress={handleSetValue} />
      </View>
    );
  } else if (category.options) {
    inputComponent = (
      <View style={styles.buttonsContainer}>
        {category.options.map((option) => {
          return (
            <View key={option} style={styles.buttonContainer}>
              <Button
                primary={option === value}
                text={option}
                handlePress={() => handleSetValue(option)}
              />
            </View>
          );
        })}
      </View>
    );
  } else {
    inputComponent = (
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={category.name}
          keyboardType={category.validation && category.validation.type === 'number' && 'numeric'}
          handleChange={(string) => handleSetValue(Number(string))}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{category.question_text}</Text>

      {inputComponent}
    </View>
  );
};

PlaceQuestion.propTypes = propTypes;
PlaceQuestion.defaultProps = defaultProps;

export default PlaceQuestion;
