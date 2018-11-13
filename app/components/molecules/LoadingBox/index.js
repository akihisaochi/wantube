import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Loading from '../../atoms/Loading/index';

const LoadingBox = ({
  boxStyle, spinnerColor,
}) => (
  <View style={{
      backgroundColor: boxStyle.color,
      width: boxStyle.width,
      height: boxStyle.height,
      borderRadius: boxStyle.radius,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Loading color={spinnerColor} />
  </View>
);

LoadingBox.propTypes = {
  boxStyle: PropTypes.shape({
    color: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
  }).isRequired,
  spinnerColor: PropTypes.string.isRequired,
};
export default LoadingBox;
