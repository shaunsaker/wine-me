import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'react-native';

import styles from './styles';

import Page from '../../../components/Page';

export class Error extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {
    message: PropTypes.string,
  };

  static defaultProps = {
    message: 'Something went wrong.',
  };

  render() {
    const { message } = this.props;

    return (
      <Page verticalCenter horizontalCenter style={styles.container}>
        <Text>{message}</Text>
      </Page>
    );
  }
}

export default connect()(Error);
