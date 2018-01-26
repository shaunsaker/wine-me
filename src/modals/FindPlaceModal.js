import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from "react-native";
import PropTypes from "prop-types";

import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import { Modal, Button } from "react-native-simple-components";
import { AnimateOpacity } from "react-native-simple-animators";
import PlaceCard from "../components/PlaceCard";

export default class FindPlaceModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleButtonPress = this.handleButtonPress.bind(this);

    this.state = {
      place: null,
    };
  }

  static get propTypes() {
    return {
      handleClose: PropTypes.func,
      places: PropTypes.object,
      userLocation: PropTypes.object,
      userPlaces: PropTypes.array,
      handleButtonPress: PropTypes.func,
    };
  }

  componentDidMount() {
    places = utilities.convertDictionaryToArray(this.props.places, true);

    places = places.map(place => {
      // Only if we have not been there
      if (
        !this.props.userPlaces ||
        !utilities.isValueInArray(place.id, this.props.userPlaces)
      ) {
        const relativeDistance = Math.round(
          utilities.getDistanceBetweenCoordinateSets(
            this.props.userLocation,
            place.location,
          ),
        );

        place["relativeDistance"] = relativeDistance;

        return place;
      }
    });

    places = utilities.sortArrayOfObjectsByKey(places, "relativeDistance");

    setTimeout(() => {
      this.setState({
        place: places[0],
      });
    }, 2000);
  }

  handleButtonPress() {
    this.props.handleClose && this.props.handleClose();
    this.props.handleButtonPress &&
      this.props.handleButtonPress(this.state.place.location);
  }

  render() {
    const mainContent = this.state.place ? (
      <AnimateOpacity
        initialValue={0}
        finalValue={1}
        shouldAnimateIn
        style={styles.mainContentContainer}>
        <PlaceCard
          place={this.state.place}
          userLocation={this.props.userLocation}
        />
        <Button
          handlePress={this.handleButtonPress}
          text="Go here"
          textStyle={styles.buttonText}
          style={styles.button}
        />
      </AnimateOpacity>
    ) : (
      <View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Finding the next</Text>
          <Text style={styles.highlightedText}>best</Text>
          <Text style={styles.text}>wine farm</Text>
          <Text style={styles.highlightedText}>closest</Text>
          <Text style={styles.text}>to you.</Text>
        </View>
        <ActivityIndicator size="large" color={styleConstants.white} />
      </View>
    );

    return (
      <Modal
        handleClose={this.props.handleClose}
        style={styles.modalContainer}
        closeIconStyle={styles.closeIcon}
        showCloseIcon>
        <View style={styles.modalBodyContainer}>{mainContent}</View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {},
  modalBodyContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: styleConstants.secondary,
  },
  mainContentContainer: {
    width: styleConstants.windowWidth,
  },
  closeIcon: {
    fontSize: styleConstants.iconFont,
    paddingTop: Platform.OS === "ios" ? 16 : 0,
  },
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 32,
  },
  text: {
    ...styleConstants.primaryFont,
    fontSize: styleConstants.largeFont,
    color: styleConstants.white,
    marginBottom: 8,
    lineHeight: styleConstants.largeFont * 1.5,
  },
  highlightedText: {
    ...styleConstants.primaryFont,
    fontSize: styleConstants.largeFont,
    color: styleConstants.lightPrimary,
    marginBottom: 8,
    marginHorizontal: 6,
    lineHeight: styleConstants.largeFont * 1.5,
  },
  button: {
    backgroundColor: styleConstants.transBlack,
    alignSelf: "center",
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: styleConstants.regularFont,
    color: styleConstants.white,
    ...styleConstants.primaryFont,
  },
});
