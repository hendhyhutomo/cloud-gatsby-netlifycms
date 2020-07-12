import React from 'react';
// import { Link } from "gatsby"
import Link from 'gatsby-plugin-transition-link';
// import TransitionLink from 'gatsby-plugin-transition-link';
import AniLink from 'gatsby-plugin-transition-link/AniLink';
import anime from 'animejs';

export default props => (
  <div>
    <h1>{props.headerText}</h1>
    <li style={{ display: `inline-block`, marginRight: `1rem` }}>
      <AniLink swipe top='entry' entryoffset={0} to='/'>
        home
      </AniLink>
    </li>
    <li style={{ display: `inline-block`, marginRight: `1rem` }}>
      <AniLink paintDrip entryoffset={0} to='/about'>
        about
      </AniLink>
    </li>
    <li style={{ display: `inline-block`, marginRight: `1rem` }}>
      <AniLink cover direction='top' duration={1} bg='#00F' to='/contact'>
        contact
      </AniLink>
    </li>
    <li style={{ display: `inline-block`, marginRight: `1rem` }}>
      <Link
        exit={{
          length: 1,
          trigger: ({ exit, node }) => {
            // console.log({ exit, node, direction: 'out' }, 'exit');
            const layoutBackground = node.querySelector('.layoutBackground');
            const staticDiv = document.querySelector('#static');
            anime({
              targets: layoutBackground,
              background: '#0000FF',
              duration: 1000
            });
            anime({
              targets: staticDiv,
              background: ['#0000FF', '#00FF00'],
              duration: 1000
            });
            staticDiv.textContent = 'exit';
          }
        }}
        entry={{
          delay: 1,
          trigger: ({ entry, node }) => {
            // console.log({ entry, node }, 'entry');
            const layoutBackground = node.querySelector('.layoutBackground');
            const staticDiv = document.querySelector('#static');

            anime({
              targets: layoutBackground,
              background: ['#0000FF', '#00FF00'],
              duration: 1000,
              begin: () => {
                // console.log('entry animation start');
              },
              complete: () => {
                // console.log('entry animation complete');
              }
            });

            if(staticDiv)staticDiv.textContent = 'change';
          }
        }}
        to='/blog'
      >
        blog
      </Link>
    </li>
  </div>
);
