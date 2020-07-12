// PLUGIN FOR GATSBY IMAGE
// FIX NETLIFY CMS IMAGE PATH FOR GATSBY IMAGE
// const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const path = require(`path`);
const fs = require('fs');
const { createFilePath } = require(`gatsby-source-filesystem`);
let redirectCreated = false;

// Pull Slug JSON Data for Slug Creation
const slugJSON = JSON.parse(fs.readFileSync('./contents/settings/slug.json'));

var deepMap = require('deep-map');
var _ = require('lodash');
var slash = require('slash');

// REDIRECT AND MAKE RELATIVE
exports.onCreateNode = ({ graphql, node, getNode, actions }) => {
  const { createRedirect } = actions;

  // FIND JSON SET IMAGE RELATIVE
  if (node.internal.type.toUpperCase().includes(`JSON`)) {
    // GET JSON NODE and ITS ABSOLUTE PATH
    const getParentPath = getNode(node.parent).absolutePath;

    // Inspired from Gatsby FM Relative Image
    const makeRelative = (value) => {
      // CHECK FOR STRING
      if (_.isString(value)) {
        // GET EXTENSION
        const { ext } = path.parse(value);

        // Check if the file is image by parsing through the REGEX Extenstion check
        const imagecheck = new RegExp('.(pn|jp|jpe)g');
        if (imagecheck.test(ext)) {
          // Build Full Path, check if there is / in the begining of the path value
          const imagePath = `${__dirname}${
            !path.isAbsolute(value) ? '/' : ''
          }${value}`;

          // Compare and make it relative with path.relative
          const relative = slash(
            path.relative(path.join(getParentPath, '..'), imagePath)
          );
          // Return Relative Value
          return relative;
        }
      }

      return value;
    };

    deepMap(node, makeRelative, {
      inPlace: true,
    });
  }
  // CREATE REDIRECT
  if (!redirectCreated) {
    // CREATE REDIRECT FROM slugJSON
    slugJSON.redirect.forEach((redirectRequest) => {
      if (redirectRequest.status) {
        const __from = redirectRequest.from;
        createRedirect({
          fromPath: __from,
          toPath: redirectRequest.to,
          isPermanent: true,
        });
      }
      redirectCreated = true;
    });
  }

  const { createNodeField } = actions;

  if (node.internal.type === `Mdx` && node.frontmatter.contenttype === `blog`) {
    const filepath = createFilePath({
      node,
      getNode,
      basePath: `src`,
    });
    let slug = `/blog/${node.frontmatter.slug}`;

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          all: allMdx(
            filter: { frontmatter: { issetting: { eq: false } } }
            sort: { fields: [frontmatter___index], order: ASC }
          ) {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  issetting
                  slug
                  title
                  contenttype
                }
              }
            }
          }
        }
      `).then((result) => {
        const results = result.data.all.edges;
        results.forEach(({ node }, index) => {
          if (node.frontmatter.contenttype == 'blog') {
            createPage({
              path: node.fields.slug,
              component: path.resolve(`./src/templates/blog-temp.js`),
              context: {
                slug: node.fields.slug,
                prev_slug:
                  index === 0 ? null : results[index - 1].node.fields.slug,
                next_slug:
                  index === results.length - 1
                    ? null
                    : results[index + 1].node.fields.slug,
                start_node: results[0].node,
              },
            });
          }
        });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};
