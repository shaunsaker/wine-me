import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles';

import RemoteImage from '../../RemoteImage';

const propTypes = {
  uri: PropTypes.string,
};

const defaultProps = {};

const Thumbnail = ({ uri }) => {
  return <RemoteImage source={{ uri }} style={styles.image} />;
};

Thumbnail.propTypes = propTypes;
Thumbnail.defaultProps = defaultProps;

export default Thumbnail;
