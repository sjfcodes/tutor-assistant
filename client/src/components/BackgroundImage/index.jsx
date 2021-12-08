import React from 'react';
import './style.css';
import { string } from 'prop-types';

const BackgroundImage = ({ url }) => {
  const styles = {
    backgroundImage: `url(${url})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  };

  return <div className='background-image' style={styles} />;
};

export default BackgroundImage;

BackgroundImage.propTypes = {
  url: string.isRequired,
};
