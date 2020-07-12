import React from 'react';
import { graphql } from 'gatsby';
import Layout from 'components/layout';

export default ({ data, location }) => {
  return (
    <Layout
      headerText='About'
      location={location}
      layoutStyle={{ background: '#eee' }}
    >
      <h1>{data.about.title}</h1>
      <p>{data.about.desc}</p>
    </Layout>
  );
};

export const query = graphql`
  query {
    about: aboutJson {
      title
      desc
      array_content {
        content
        title
      }
    }
  }
`;
