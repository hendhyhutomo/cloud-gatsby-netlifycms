import PropTypes from 'prop-types';
import React from 'react';

export default function Preview({ value }) {
  return (
    <div style={{ background: value, width: '100%', height: '100%' }}></div>
  );
}

Preview.propTypes = {
  value: PropTypes.node,
};
