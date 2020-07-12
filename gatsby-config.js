require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const emoji = require(`remark-emoji`);
const { isNil } = require('lodash');

const lunrAdjustment = (lunr) => (builder) => {
  console.log(builder);
  // Function to remove Stemmer
  // builder.pipeline.remove(lunr.stemmer)
  // builder.searchPipeline.remove(lunr.stemmer)

  // Similarity Tuning
  // A parameter to control how quickly an increase in term frequency results in term frequency saturation, the default value is 1.2.
  builder.k1(1.3);
  // B: A parameter to control field length normalization, setting this to 0 disabled normalization, 1 fully normalizes field lengths, the default value is 0.75.
  builder.b(0);
};

module.exports = {
  siteMetadata: {
    title: `${process.env.SITE_TITLE}`,
    siteUrl: `${process.env.SITE_URL}`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: `${__dirname}/contents/blog`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'uploads',
        path: `${__dirname}/static/assets`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Gatsby Starter',
        short_name: 'gatsbyStarter',
        start_url: '/',
        background_color: '#6b37bf',
        theme_color: '#6b37bf',
        display: 'standalone',
        icon: 'src/images/icon/icon.png',
      },
    },
    // FIND ABOUT JSON FILE
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `about`,
        path: `${__dirname}/contents/pages/about`,
      },
    },
    // FIND SITE SETTINGS JSON FILE
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `siteSettings`,
        path: `${__dirname}/contents/settings/sitesettings.json`,
      },
    },
    `gatsby-transformer-json`,
    // CUSTOM TRANSFORM PLUGIN [FOR REFERENCE IN CREATING PLUGINS]
    // `gatsby-transformer-json-withpath`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `siteSettings`,
    //     path: `${__dirname}/contents/settings/sitesettings.json`,
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    // ADD SERVICE WORKER FOR WEB-APP OFFLINE FUNCTIONALITY
    // `gatsby-plugin-offline`,
    // REMOVE SERVICE WORKER
    `gatsby-plugin-remove-serviceworker`,
    {
      resolve: 'gatsby-plugin-transition-link',
      // options: {
      //   layout: require.resolve(`./src/layout/index.js`)
      // }
    },
    `gatsby-plugin-netlify-cache`,
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
        modulePath: `${__dirname}/cms/cms.js`,
        htmlTitle: `${process.env.SITE_TITLE} | Content Manager`,
        htmlFavicon: `${__dirname}/src/images/icon/icon.png`,
      },
    },
    // TURNED OFF BECAUSE OF CLOUDINARY
    // `gatsby-transformer-sharp`,
    // `gatsby-plugin-sharp`,
    {
      // ADDED PREPROCESSOR FOR CLOUDINARY
      resolve: `gatsby-transformer-cloudinary`,
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        uploadFolder: 'assets',
      },
    },
    // ADD LAYOUT FUNCTIONALITY
    // {
    //   resolve: `gatsby-plugin-layout`,
    //   options: {
    //     component: require.resolve(`${__dirname}/src/[[LAYOUT PATH]]`),
    //   },
    // },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: [`/@deploystatus`],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `${process.env.GOOGLE_TRACKINGID}`,
      },
    },
    // `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        remarkPlugins: [emoji],
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          // Copy images in markdown without processing them (FOR GIF & SVG)
          `gatsby-remark-static-images`,
          // Unwrap images in Markdown to remove them from <p/> tag :sadface:
          `gatsby-remark-unwrap-images`,
          // FIX NETLIFY CMS IMAGE PATH
          {
            // FIX NETLIFY CMS IMAGE PATH
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
              backgroundColor: 'transparent', // required to display blurred image first
            },
          },
          {
            // COPY LINKED FILE TO THE PUBLIC FOLDER
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: `static`,
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`],
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-lunr',
      options: {
        languages: [
          {
            name: 'en',
            filterNodes: (node) => {
              if (!isNil(node.frontmatter)) {
                if (node.frontmatter.contenttype === 'blog') {
                  return true;
                }
              }
            },
            plugin: [lunrAdjustment],
          },
        ],
        // WHAT TO DO WITH THE FIELDS, Store = Add Value
        fields: [
          { name: 'title', store: true, attributes: { boost: 20 } },
          { name: 'date', store: true, attributes: { boost: 5 } },
          { name: 'url', store: true },
          { name: 'excerpt', store: true },
          { name: 'coverimage', store: true },
        ],
        // GET FIELDS
        resolvers: {
          Mdx: {
            title: (node) => node.frontmatter.title,
            date: (node) => node.frontmatter.date,
            url: (node) => node.fields.slug,
            fm_slug: (node) => node.frontmatter.slug,
            coverimage: (node) => node.frontmatter.coverimage.absolutePath,
            excerpt: (node) => node.excerpt,
          },
        },
        filename: 'search_index.json',
        fetchOptions: {
          credentials: 'same-origin',
        },
      },
    },
    `gatsby-plugin-meta-redirect` // Handle Redirect for Hosting not in Netlify or Amazon S3
    // {
    //   resolve: `gatsby-plugin-netlify`,
    //   options: {
    //     generateMatchPathRewrites: false, // boolean to turn off automatic creation of redirect rules for client only paths
    //   },
    // },
  ],
};
