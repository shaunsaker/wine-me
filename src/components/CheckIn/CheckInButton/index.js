import React from 'react';
import PropTypes from 'prop-types';

import FooterButton from '../../FooterButton';

const propTypes = {
  handlePress: PropTypes.func,
  isCheckedIn: PropTypes.bool,
  isLoading: PropTypes.bool,
};

const defaultProps = {};

const CheckInButton = ({ handlePress, isCheckedIn, isLoading }) => {
  return (
    <FooterButton
      handlePress={handlePress}
      disabled={isCheckedIn}
      iconName={isCheckedIn ? 'check' : 'gps-fixed'}
      text={isCheckedIn ? 'Checked in' : 'Check in'}
      alternateStyle={isCheckedIn}
      showLoader={isLoading}
    />
  );
};

CheckInButton.propTypes = propTypes;
CheckInButton.defaultProps = defaultProps;

export default CheckInButton;
