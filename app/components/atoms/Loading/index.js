import React from 'react';
import { Spinner } from 'native-base';
import PropTypes from 'prop-types';

const Loading = ({ color }) => <Spinner color={color} />;
Loading.propTypes = {
  color: PropTypes.string.isRequired,
};
export default Loading;