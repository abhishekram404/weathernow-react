import React from "react";
import "./css/Search.css";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SearchIcon from "@material-ui/icons/Search";
import svg2 from "./assets/svg2.svg";

const Search = () => {
  return (
    <div className="search-container">
      <div className="left">
        <form action="#">
          <div className="input-group">
            <span>
              <LocationOnIcon className="location-icon" />
            </span>
            <input type="text" placeholder="Place name here..." />
          </div>
          <button>
            <SearchIcon />
            <p>Search</p>
          </button>
        </form>
      </div>
      <div className="right">
        <img src={svg2} alt="illustration" />
      </div>
    </div>
  );
};

export default Search;
