import React from 'react';
import ReactYouTube from 'react-youtube';
// import { graphql } from 'gatsby';
// import Layout from 'components/layout';s

export default (props) => {
  // https://developers.google.com/youtube/player_parameters

  const { youtubeId, autoPlay } = props;
  const opts = {
    playerVars: {
      autoplay: autoPlay ? 1 : 0,
      controls: 0,
      modestbranding: 1,
    },
  };

  console.log('check', autoPlay, opts, props);
  return (
    <ReactYouTube
      className='player'
      containerClassName='container'
      videoId={youtubeId}
      opts={opts}
    />
  );
};
