import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from 'antd';

const CircleAvatar = ({ imageUrl, size }) => {
  return (
    <Avatar size={size} src={imageUrl} alt="Avatar" style={{ borderRadius: '50%' }} />
  );
};

CircleAvatar.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default CircleAvatar;
