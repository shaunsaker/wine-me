import React from "react";
import {
    View,
    ActivityIndicator,
    Animated,
    Easing,
    StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import utilities from "../utilities";
import styleConstants from "../assets/styleConstants";

import { AnimateScale } from "react-native-simple-animators";
import SecondaryButton from "../components/SecondaryButton";
import Icon from "react-native-vector-icons/MaterialIcons";

export class CheckInButtonWidget extends React.Component {
    constructor(props) {
        super(props);

        this.toggleLoading = this.toggleLoading.bind(this);
        this.setError = this.setError.bind(this);
        this.animate = this.animate.bind(this);

        this.state = {
            isFetchingUserLocation: false,
            hasFetchedUserLocation: false,
            isComparingLocations: false,
            animatedValue: new Animated.Value(
                // hasUserCheckedIn
                utilities.isKeyValuePairPresentInDictionary(
                    { placeID: this.props.placeID },
                    this.props.userCheckIns,
                )
                    ? 160
                    : 136,
            ),
            isAnimating: false,
        };
    }

    static get propTypes() {
        return {
            userCheckIns: PropTypes.object,
            uid: PropTypes.string,

            // Passed props
            placeLocation: PropTypes.object,
            placeID: PropTypes.string,
            relativeDistance: PropTypes.number,
        };
    }

    toggleLoading() {
        if (
            !this.state.isFetchingUserLocation &&
            !this.state.hasFetchedUserLocation &&
            !this.state.isComparingLocations
        ) {
            this.animate(292);

            this.setState({
                isFetchingUserLocation: true,
            });

            setTimeout(() => {
                this.toggleLoading();
            }, 2000);
        } else if (
            this.state.isFetchingUserLocation &&
            !this.state.hasFetchedUserLocation &&
            !this.state.isComparingLocations
        ) {
            this.setState({
                isFetchingUserLocation: false,
                hasFetchedUserLocation: true,
            });

            this.animate(232);

            setTimeout(() => {
                this.toggleLoading();
            }, 1500);
        } else if (
            !this.state.isFetchingUserLocation &&
            this.state.hasFetchedUserLocation &&
            !this.state.isComparingLocations
        ) {
            this.setState({
                isComparingLocations: true,
            });
            this.animate(284);

            setTimeout(() => {
                // If the user is 1km within the place's radius
                if (this.props.relativeDistance >= 1) {
                    // Add it to check ins and dispatch success action
                    this.setState({
                        hasFetchedUserLocation: false, // RESET
                        isComparingLocations: false,
                    });

                    this.animate(160);

                    const checkInID = utilities.createUUID();

                    this.props.dispatch({
                        type: "updateData",
                        node: `app/places/${
                            this.props.placeID
                        }/checkIns/${checkInID}`,
                        data: {
                            uid: this.props.uid,
                            date: Date.now(),
                        },
                        nextAction: {
                            type: "updateData",
                            node: `users/${
                                this.props.uid
                            }/checkIns/${checkInID}`,
                            data: {
                                placeID: this.props.placeID,
                            },
                        },
                    });
                } else {
                    this.animate(136);

                    this.setError(
                        "You need to be within 1km of the place you're trying to check in to.",
                        3000,
                    );

                    this.setState({
                        isFetchingUserLocation: false,
                        hasFetchedUserLocation: false,
                        isComparingLocations: false,
                    });
                }
            }, 2000);
        }
    }

    setError(message, duration) {
        this.props.dispatch({
            type: "SET_ERROR",
            errorType: "LOCATION",
            message,
            duration,
        });
    }

    animate(toValue) {
        this.setState({
            isAnimating: true,
        });

        Animated.timing(this.state.animatedValue, {
            toValue,
            duration: 500,
            easing: Easing.out(Easing.quad),
            useNativeDriver: false,
        }).start(() => {
            this.setState({
                isAnimating: false,
            });
        });
    }

    render() {
        const hasUserCheckedIn = utilities.isKeyValuePairPresentInDictionary(
            { placeID: this.props.placeID },
            this.props.userCheckIns,
        );

        const isLoading =
            this.state.isFetchingUserLocation ||
            this.state.isComparingLocations;

        const buttonDisabled = hasUserCheckedIn || isLoading;
        this.state.hasFetchedUserLocation;

        const iconComponent =
            !this.state.isAnimating &&
            (this.state.hasFetchedUserLocation && !isLoading ? (
                <AnimateScale
                    initialValue={0}
                    finalValue={1}
                    shouldAnimateIn
                    delay={250}>
                    <Icon name="check" style={styles.actionButtonIcon} />
                </AnimateScale>
            ) : (
                (this.state.isFetchingUserLocation ||
                    this.state.isComparingLocations) && (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator
                            size="small"
                            color={styleConstants.white}
                        />
                    </View>
                )
            ));

        const animatedStyles = {
            width: this.state.animatedValue,
        };

        const iconName =
            !this.state.isAnimating &&
            (hasUserCheckedIn
                ? "check"
                : this.state.hasFetchedUserLocation
                    ? "check"
                    : "location-searching");

        const buttonText =
            !this.state.isAnimating &&
            (hasUserCheckedIn
                ? "CHECKED IN"
                : this.state.isFetchingUserLocation
                    ? "GETTING YOUR LOCATION..."
                    : this.state.hasFetchedUserLocation
                        ? this.state.isComparingLocations
                            ? "COMPARING LOCATIONS..."
                            : "GOT YOUR LOCATION"
                        : "CHECK IN");

        return (
            <Animated.View style={animatedStyles}>
                <SecondaryButton
                    customIcon={iconComponent}
                    iconName={iconName}
                    text={buttonText}
                    style={hasUserCheckedIn && styles.checkedInButton}
                    handlePress={!buttonDisabled ? this.toggleLoading : null}
                    disabled={buttonDisabled}
                    disabledStyle={{ opacity: 1 }}
                    showShadow
                />
            </Animated.View>
        );
    }
}

function mapStateToProps(state) {
    return {
        userCheckIns:
            state.main.appData.users &&
            state.main.appData.users[state.main.userAuth.uid] &&
            state.main.appData.users[state.main.userAuth.uid].checkIns,
        uid: state.main.userAuth.uid,
    };
}

const styles = StyleSheet.create({
    checkedInButton: {
        backgroundColor: styleConstants.success,
    },
    loaderContainer: {
        marginRight: 8,
        marginLeft: -8,
    },
    actionButtonIcon: {
        fontSize: styleConstants.iconFont,
        color: styleConstants.white,
        marginRight: 4,
    },
});

export default connect(mapStateToProps)(CheckInButtonWidget);
