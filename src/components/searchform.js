import React from "react"
import { navigate } from "@reach/router"

const SearchForm = ({query}) => (
  <form role="search" method="GET">
    <label htmlFor="search-input">
      <h1>Search posts</h1>
    </label>
    <input
      type="search"
      id="search-input"
      name="keywords"
      onChange={e =>
        navigate(`/search?q=${encodeURIComponent(e.target.value)}`)
      }
      value={query}
    />
    <button type="submit">Submit</button>
  </form>
)

export default SearchForm
