import React, { useState, useEffect } from 'react';
import Layout from 'components/layout';

import SearchForm from 'components/searchform';

const SearchResults = ({ results, query }) => (
  <section aria-label='Search results for all posts'>
    {!!results.length && (
      <h2 className='search-results-count' aria-live='assertive'>
        Found {results.length} posts on "{query}"
      </h2>
    )}
    {!!results.length && (
      <ol className='search-results-list'>
        {results.map(({ title, url, date, description }) => (
          <li key={title}>
            <h3 className='search-results-list__heading'>
              <a href={url} className='search-results-list__link'>
                {title}
              </a>
            </h3>
            <small>{new Date(date).toLocaleString('en-GB')}</small>
            {description && <p>{description}</p>}
          </li>
        ))}
      </ol>
    )}
  </section>
);

export default ({location }) => {
  const [results, setResults] = useState([]);

  //GET QUERY FROM BROWSER
  const searchQuery =
    new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    if (searchQuery && window.__LUNR__) {
      window.__LUNR__.__loaded.then((lunr) => {
        const refs = lunr.en.index.search(searchQuery);
        const posts = refs.map(({ ref }) => lunr.en.store[ref]);
        console.log(posts);
        setResults(posts);
      });
    }
    console.log(results);
  }, [location, searchQuery]);

  return (
    <Layout
      headerText="Search"
      location={location}
    >
      <SearchForm query={searchQuery} />
      <SearchResults query={searchQuery} results={results} />
    </Layout>
  );
};
