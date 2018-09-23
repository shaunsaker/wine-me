import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

import Touchable from '../Touchable';

const propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      iconName: PropTypes.string,
    }),
  ).isRequired,
  activeTab: PropTypes.shape({
    name: PropTypes.string,
    iconName: PropTypes.string,
  }).isRequired,
  handleTabPress: PropTypes.func,
};

const defaultProps = {};

const TabBar = ({ tabs, activeTab, handleTabPress }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab && activeTab.name === tab.name;

        return (
          <Touchable
            key={tab.name}
            onPress={() => handleTabPress(tab)}
            style={[styles.tabContainer, isActive && styles.activeTabContainer]}
          >
            <Icon name={tab.iconName} style={[styles.icon, isActive && styles.activeText]} />

            <Text style={[styles.text, isActive && styles.activeText]}>{tab.name}</Text>
          </Touchable>
        );
      })}
    </View>
  );
};

TabBar.propTypes = propTypes;
TabBar.defaultProps = defaultProps;

export default TabBar;
