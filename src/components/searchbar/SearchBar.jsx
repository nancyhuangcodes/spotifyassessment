import React, { useState } from 'react'
import "./SearchBar.css"

function SearchBar({onClick}) {

  const [searchInput, setSearchInput] = useState("");

  function handleSearchChange(event) {
    // call a method to render the search
    //console.log(event.target.value);
    setSearchInput(event.target.value);
  }

  function handleSearchClick() {
    onClick(searchInput);
    // alert("I'VE BEEN CLICKED");
  }

  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song, Album, or Artist" onChange={handleSearchChange} />
      <button className="SearchButton" onClick={handleSearchClick}>SEARCH</button>
    </div>
  )
}

export default SearchBar