import React from 'react';
import { graphql } from 'gatsby';
import Layout from 'components/layout';
// import Img from 'gatsby-image';
// import { Link, TransitionLink } from 'gatsby-plugin-transition-link';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

export default ({ location, data }) => (
  <Layout
    headerText='List'
    location={location}
    layoutStyle={{ background: '#eeF' }}
  >
    <div>
      <h1> Pages List </h1>
      <h4>
        {data.allMdx.totalCount}
        Pages
      </h4>
      {data.allMdx.edges.map(({ node }) => (
        <AniLink swipe top='entry' to={node.fields.slug} key={node.id}>
          <h3>
            {node.frontmatter.index} {node.frontmatter.title}{' '}
            <span> —{node.frontmatter.date} </span>
          </h3>
          <br />
        </AniLink>
      ))}
    </div>
  </Layout>
);

export const query = graphql`
  query {
    allMdx(
      filter: {
        frontmatter: { issetting: { eq: false }, contenttype: { eq: "blog" } }
      }
      sort: { fields: [frontmatter___index], order: ASC }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            index
            title
            date(formatString: "DD MMMM, YYYY")
            slug
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;

// Image Sharp
// childImageSharp {
//   fluid(maxWidth: 1000, quality: 100) {
//     ...GatsbyImageSharpFluid
//   }
