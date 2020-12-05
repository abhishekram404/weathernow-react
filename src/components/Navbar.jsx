import React, { useState } from "react";
import CloudQueueIcon from "@material-ui/icons/CloudQueue";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import "./css/Navbar.css";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
const Navbar = (props) => {
  var [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.callback(query);
  };

  return (
    <nav>
      <NavLink to="/">
        <div className="brand-logo">
          <CloudQueueIcon className="weather-icon" />
          <p>weather now</p>
        </div>
      </NavLink>
      <ul>
        <NavLink to="/">
          <li className="active">current</li>
        </NavLink>
        <li>about</li>
      </ul>
      <form action="#" onSubmit={handleSubmit}>
        <div className="input-group">
          <span>
            <LocationOnIcon className="location-icon" />
          </span>
          <input
            value={query}
            type="text"
            placeholder="Place name here..."
            onChange={handleChange}
          />
        </div>
      </form>
    </nav>
  );
};

export default Navbar;
