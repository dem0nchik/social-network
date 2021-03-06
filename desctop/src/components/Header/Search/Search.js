import React from 'react'
import styles from './Search.module.css'

const Search = (props) => {

  return (
    <div className={styles.search}>
      <label htmlFor="search">
        <input name='search' type="text"/>
      </label>
      

      <svg className={styles.icon_search} xmlns="http://www.w3.org/2000/svg" width="16" height="16">
        <g fill="none" fillRule="evenodd" opacity=".92">
          <path opacity=".1" d="M0 0H16V16H0z"/>
          <path d="M6.5 1a5.5 5.5 0 0 1 4.383 8.823l3.896 3.9a.75.75 0 0 1-1.061 1.06l-3.895-3.9A5.5 5.5 0 1 1 6.5 1zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" fill="#818c99" fillRule="nonzero"/>
        </g>
      </svg>
    </div>
  )
}

export default Search

