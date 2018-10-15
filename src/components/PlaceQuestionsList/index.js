import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';

import styleConstants from '../../styleConstants';
import styles from './styles';

import PlaceQuestion from './PlaceQuestion';

export default class PlaceQuestionsList extends React.Component {
  constructor(props) {
    super(props);

    this.scrollToIndex = this.scrollToIndex.bind(this);
    this.renderItem = this.renderItem.bind(this);

    this.slideWidth =
      styleConstants.dimensions.window.width - styleConstants.dimensions.spacing.horizontal * 4;
  }

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({})),
    handleSetValue: PropTypes.func,
    slideIndex: PropTypes.number,
  };

  static defaultProps = {};

  componentDidUpdate(prevProps) {
    const { slideIndex } = this.props;

    if (slideIndex !== prevProps.slideIndex) {
      this.scrollToIndex(slideIndex);
    }
  }

  scrollToIndex(index) {
    this.flatList.scrollToIndex({ index, animated: true });
  }

  renderItem({ item }) {
    const { handleSetValue } = this.props;

    return (
      <View style={[styles.placeQuestionContainer, { width: this.slideWidth }]}>
        <PlaceQuestion
          category={item}
          value={item.value}
          handleSetValue={(value) => handleSetValue(item.id, value)}
        />
      </View>
    );
  }

  render() {
    const { data } = this.props;

    return (
      <FlatList
        ref={(c) => {
          this.flatList = c;
        }}
        keyExtractor={({ id }) => id}
        data={data}
        renderItem={this.renderItem}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        horizontal
        pagingEnabled
        scrollEnabled={false} // we manually control the scrolling
      />
    );
  }
}
