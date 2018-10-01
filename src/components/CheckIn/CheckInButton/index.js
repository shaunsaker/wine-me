import React from 'react';
import PropTypes from 'prop-types';

import FooterButton from '../../FooterButton';

const propTypes = {
  handlePress: PropTypes.func,
  isCheckedIn: PropTypes.bool,
};

const defaultProps = {};

const CheckInButton = ({ handlePress, isCheckedIn }) => {
  return (
    <FooterButton
      handlePress={handlePress}
      disabled={isCheckedIn}
      iconName={isCheckedIn ? 'gps-fixed' : 'gps-not-fixed'}
      text={isCheckedIn ? 'Checked in' : 'Check in'}
      alternateStyle={isCheckedIn}
    />
  );
};

CheckInButton.propTypes = propTypes;
CheckInButton.defaultProps = defaultProps;

export default CheckInButton;
