import React from 'react'
import Loader from 'react-loader-spinner'

const baseStyle = {
  display : 'block',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)'
};

export const Loaders = () => {
  return(
    <div style={baseStyle}>
      <Loader
        type="Rings"
        color="#ccc"
        height={100}
        width={100}
      />
    </div>
  );
}