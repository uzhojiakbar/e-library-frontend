import React, { useState } from "react";
import { SearchDesign, SearchIcon, SearchInput } from "./style";

const Search = () => {
  const [text, setText] = useState("");

  const OnSearch = () => {
    console.log(text);
  };
  const clearText = () => {
    setText("");
  };
  return (
    <SearchDesign>
      <SearchInput
        onKeyDown={(e) => e.key === "Enter" && OnSearch()}
        onChange={(e) => setText(e.target.value.toLowerCase())}
        value={text}
        type="text"
        placeholder="Qidiruv..."
      />
      {text.length ? (
        <SearchIcon onClick={clearText}>
          <i className="fa-solid fa-x"></i>
        </SearchIcon>
      ) : (
        <SearchIcon onClick={OnSearch}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </SearchIcon>
      )}
    </SearchDesign>
  );
};

export default Search;
