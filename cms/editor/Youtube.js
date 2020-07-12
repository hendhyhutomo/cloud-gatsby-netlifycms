import React from 'react';

export default function Youtube(props) {
  return (
    <img
      src={`http://img.youtube.com/vi/${props.id}/maxresdefault.jpg`}
      alt='Youtube Video'
    />
  );
}
