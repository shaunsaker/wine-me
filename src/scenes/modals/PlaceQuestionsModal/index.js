import React from 'react';

import { connect } from 'react-redux';
import { View } from 'react-native';

import styles from './styles';

import Lightbox from '../../../components/Lightbox';

export class InfoModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Lightbox>
        <View style={styles.container}>
          <View />
        </View>
      </Lightbox>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(InfoModal);
