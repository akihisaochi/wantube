import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Segment, InputGroup, Input } from 'native-base';
import { Icon } from 'react-native-elements';
// import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  searchWrapper: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: '#fafafa',
  },
  searchBox: {
    width: '100%',
    paddingHorizontal: 15,
  },
});

export default class SearchSegment extends Component {
  render() {
    return (
      <Segment padder style={styles.searchWrapper}>
        <InputGroup style={styles.searchBox}>
          <Icon type="font-awesome" name="search" color="#0071BC" />
          <Input
            placeholder="検索"
            clearButtonMode="always"
          />
        </InputGroup>
      </Segment>
    );
  }
}
