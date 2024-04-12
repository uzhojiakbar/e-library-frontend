import React, { useRef, useState } from "react";
import { SearchDesign, SearchIcon, SearchInput } from "./style";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const searchRef = useRef("")
  const nav = useNavigate()
  const OnSearch = () => {
    let text = searchRef.current.value
    console.log(document.location.pathname);
    if (text.length) {
      nav(`search/${searchRef.current.value}`)
    } else {
      if (document.location.pathname !== '/') {
        nav(`/`)
      }
    }
  };

  return (
    <SearchDesign>
      <SearchInput
        onKeyDown={(e) => e.key === "Enter" && OnSearch()}
        // onChange={(e) => setText(e.target.value.toLowerCase())}
        ref={searchRef}
        type="text"
        placeholder="Qidiruv..."
      />
      <SearchIcon onClick={OnSearch}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </SearchIcon>
    </SearchDesign>
  );
};

export default Search;
