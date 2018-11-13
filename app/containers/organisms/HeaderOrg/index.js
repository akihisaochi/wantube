import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  headerOuter: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    height: 80,
  },
  headerInner: {
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0071bc',
    position: 'relative',
    top: 0,
  },
  rightChild: {
    position: 'absolute',
    right: 0,
    top: 15,
  },
  leftChild: {
    position: 'absolute',
    left: 0,
    top: 15,
  },
});

export default class HeaderOrg extends Component {
  render() {
    return (
      <Header
        outerContainerStyles={styles.headerOuter}
        innerContainerStyles={styles.headerInner}
      >
        <View style={styles.leftChild}>
          {this.props.leftChild}
        </View>
        <Text style={styles.headerTitle}>
          { this.props.titleText }
        </Text>
        <View style={styles.rightChild}>
          {this.props.rightChild}
        </View>
      </Header>
    );
  }
}
HeaderOrg.propTypes = {
  titleText: PropTypes.string.isRequired,
  leftChild: PropTypes.element.isRequired,
  rightChild: PropTypes.element.isRequired,
};
