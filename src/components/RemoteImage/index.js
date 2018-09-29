import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator, ViewPropTypes } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
import styleConstants from '../../styleConstants';

export default class RemoteImage extends React.Component {
  constructor(props) {
    super(props);

    this.setError = this.setError.bind(this);
    this.setLoading = this.setLoading.bind(this);

    this.state = {
      isLoading: false,
      hasError: false,
    };
  }

  static propTypes = {
    source: PropTypes.shape({
      uri: PropTypes.string,
    }),
    style: ViewPropTypes.style,
  };

  static defaultProps = {};

  setError() {
    this.setState({
      hasError: true,
    });

    this.setLoading(false);
  }

  setLoading(isLoading) {
    this.setState({
      isLoading,
    });
  }

  render() {
    const { hasError, isLoading } = this.state;
    const { source, style } = this.props;
    let backgroundComponent;

    if (hasError) {
      backgroundComponent = (
        <View style={styles.backgroundContainer}>
          <Icon name="error-outline" style={styles.icon} />
        </View>
      );
    } else if (isLoading) {
      backgroundComponent = (
        <View style={styles.backgroundContainer}>
          <ActivityIndicator size="large" color={styleConstants.colors.primary} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FastImage
          source={source}
          style={[styles.image, style]}
          onLoadStart={() => this.setLoading(true)}
          onLoadEnd={() => this.setLoading(false)}
          onError={this.setError}
        />
        {backgroundComponent}
      </View>
    );
  }
}
