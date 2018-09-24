import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import utils from '../../utils';

import TABS from './TABS';

import TabBar from './TabBar';

export class TabBarContainer extends React.Component {
  constructor(props) {
    super(props);

    this.onTabPress = this.onTabPress.bind(this);
    this.navigate = this.navigate.bind(this);

    this.state = {};
  }

  static propTypes = {
    scene: PropTypes.string,
  };

  static defaultProps = {};

  isCurrentScene(tab) {
    const { scene } = this.props;
    const isCurrentScene = tab.sceneKey === scene || tab.sceneKey === Actions.currentScene; // FIXME: scene is not always available on mount?

    return isCurrentScene;
  }

  onTabPress(tab) {
    this.navigate(tab.sceneKey);
  }

  navigate(page, props) {
    utils.app.navigate(page, props);
  }

  render() {
    const activeTab = TABS.filter((tab) => this.isCurrentScene(tab))[0];

    return <TabBar tabs={TABS} activeTab={activeTab} handleTabPress={this.onTabPress} />;
  }
}

function mapStateToProps(state) {
  return {
    scene: state.navigation.scene,
  };
}

export default connect(mapStateToProps)(TabBarContainer);
