import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from 'components/layout';
import Img from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import Youtube from 'components/mdx/Youtube';

const mdxCodes = { Youtube };
export default class BlogTemp extends React.Component {
  componentDidMount() {
    document.body.classList.remove('preloading');
  }
  render() {
    const post = this.props.data.content;
    const next_slug = this.props.pageContext.next_slug;
    const prev_slug = this.props.pageContext.prev_slug;
    return (
      <Layout
        headerText={post.frontmatter.title}
        location={this.props.location}
      >
        {/* <img src={post.frontmatter.coverimage} alt="testimage" /> */}
        {/* GATSBY IMAGE LINE */}
        <Img
          className='image_class'
          fluid={post.frontmatter.coverimage.childCloudinaryAsset.fluid}
          backgroundColor='#000'
        />
        {/* <div dangerouslySetInnerHTML={{ __html: post.html }} /> */}
        {/* declare MDX Shortcodes */}
        <MDXProvider components={mdxCodes}>
          <MDXRenderer>{post.body}</MDXRenderer>
        </MDXProvider>
        {/* IMPORTED FROM CLOUDINARY */}
        <h2>CLoudinary Image</h2>
        <img src={post.frontmatter.object.thumbimage} alt='testimage' />

        {/* NAVIGATION*/}
        <div>
          {next_slug && (
            <Link to={next_slug}>
              <h2>Next Page</h2>
            </Link>
          )}
          {prev_slug && (
            <Link to={prev_slug}>
              <h2>Prev Page</h2>
            </Link>
          )}
        </div>
        <div>
          <h1>Pages List</h1>
          <h4>{this.props.data.all.totalCount} Pages</h4>
          {this.props.data.all.edges.map(({ node }) => (
            <Link to={`${node.fields.slug}`} key={node.id}>
              <h3>
                {node.frontmatter.index} {node.frontmatter.title}{' '}
                <span>— {node.frontmatter.date}</span>
              </h3>
              <p>{node.excerpt}</p>
            </Link>
          ))}
        </div>
      </Layout>
    );
  }
}

export const query = graphql`
  query($slug: String!) {
    all: allMdx(
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
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    content: mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        coverimage {
          childCloudinaryAsset {
            fluid {
              ...CloudinaryAssetFluid
            }
          }
        }
        object {
          thumbimage
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
