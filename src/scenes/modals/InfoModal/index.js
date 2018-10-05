import React from 'react';

import { connect } from 'react-redux';
import { View } from 'react-native';

import styles from './styles';

import Lightbox from '../../../components/Lightbox';
import BuildStatus from '../../../components/BuildStatus';
import CodePushStatus from '../../../components/CodePushStatus';

export class InfoModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Lightbox title="Info">
        <View style={styles.container}>
          <BuildStatus />

          <View style={styles.codePushStatusContainer}>
            <CodePushStatus />
          </View>
        </View>
      </Lightbox>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(InfoModal);
