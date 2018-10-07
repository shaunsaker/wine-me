import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';

import styles from './styles';

import RemoteImage from '../RemoteImage';

export default class ThumbnailList extends React.Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })),
  };

  static defaultProps = {};

  renderItem({ item }) {
    const { uri } = item;

    return (
      <View style={styles.itemContainer}>
        <RemoteImage source={{ uri }} style={styles.image} />
      </View>
    );
  }

  render() {
    const { data } = this.props;

    return (
      <FlatList
        keyExtractor={({ uri }) => uri}
        data={data}
        renderItem={this.renderItem}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        horizontal
        initialNumToRender={3}
      />
    );
  }
}
