import React, { useContext } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Header from 'components/header';
// import SearchForm from 'components/searchform';
import 'stylesheet/main.scss';
import { Helmet } from 'react-helmet';
import { GlobalContext } from '../context/GlobalContext';

const Layout = (props) => {
  // CONTEXT TRIAL
  const context = useContext(GlobalContext);
  context.var = true;

  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              siteUrl
            }
          }
        }
      `}
      render={(data) => {
        const seo = {
          desc: '',
          keywords: '',
          image: '',
          url: data.site.siteMetadata.siteUrl,
        };
        const webname = data.site.siteMetadata.title;
        return (
          <GlobalContext.Consumer>
            {(context) => (
              <div id='MainLayoutWrapper'>
                <Helmet>
                  <title>
                    {props.titleText
                      ? `${props.titleText} | ${webname}`
                      : webname}
                  </title>
                  <meta name='description' content={seo.desc} />
                  <meta name='image' content={seo.image} />
                  <meta name='keywords' content={seo.keywords} />
                  {seo.url && <meta property='og:url' content={seo.url} />}

                  {props.titleText ? (
                    <meta
                      property='og:title'
                      content={`${props.titleText} | ${webname}`}
                    />
                  ) : (
                    <meta property='og:title' content={webname} />
                  )}
                  {seo.desc && (
                    <meta property='og:description' content={seo.desc} />
                  )}
                  {seo.image && (
                    <meta property='og:image' content={seo.image} />
                  )}
                  <meta name='twitter:card' content='summary_large_image' />

                  {props.titleText ? (
                    <meta
                      property='twitter:title'
                      content={`${props.titleText} | ${webname}`}
                    />
                  ) : (
                    <meta property='twitter:title' content={webname} />
                  )}
                  {seo.desc && (
                    <meta name='twitter:description' content={seo.desc} />
                  )}
                  {seo.image && (
                    <meta name='twitter:image' content={seo.image} />
                  )}
                </Helmet>
                <div>{data.site.siteMetadata.title}</div>
                <Header headerText={props.headerText} />
                {props.children}

                <div className='layoutBackground'></div>
                {/* // DISPLAYING CONTEXT HERE */}
                <div
                  id='static'
                  onClick={() => {
                    context.function(true);
                  }}
                  role='button'
                  tabIndex='0'
                  // ADDING KEYDOWN Complying with Accesibility
                  onKeyDown={(event) => {
                    if (event.keycode === 13) context.function(true);
                  }}
                >
                  Static Position {context.var.toString()}
                </div>
              </div>
            )}
          </GlobalContext.Consumer>
        );
      }}
    />
  );
};

export default Layout;
