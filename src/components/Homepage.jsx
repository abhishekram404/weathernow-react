import React, { useEffect, useState } from "react";

import "./css/Homepage.css";
import axios from "axios";
import svg1 from "./assets/svg1.svg";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const Homepage = (props) => {
  var [data, setData] = useState();
  var [lat, setLat] = useState("");
  var [lon, setLon] = useState("");
  var [isError, setError] = useState(false);
  var [searched, setSearched] = useState(props.query);

  useEffect(() => {
    setData(false);
    if (props.query) {
      setSearched(props.query);
    }

    function getLoc() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          setLat(position.coords.latitude.toString());
          setLon(position.coords.longitude.toString());

          if (lat && lon) {
            let link = searched
              ? `http://api.openweathermap.org/data/2.5/weather?q=${searched}&units=metric&appId=b59f2b6e8322e621458fe6467f9c31db`
              : `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appId=b59f2b6e8322e621458fe6467f9c31db`;

            const getWeatherData = async () => {
              var weatherData = await axios(link);
              setData(await weatherData.data);
              console.log(await weatherData.data);
            };

            getWeatherData();
          }
        });
      } else {
        console.log("Geolocation API isn't supported by your browser");
      }
    }
    getLoc();
    // } catch (err) {
    //   console.log("Error occured");
    //   setError(true);
    // }
  }, [lat, lon, props, searched]);
  return (
    <>
      {data ? (
        <div className="container">
          <div className="left">
            <div className="top">
              <h1>{data.main.temp}&deg;C</h1>
            </div>
            <div className="bottom">
              <ul>
                <li>Humidity : {data.main.humidity}</li>
                <li>Wind : {data.wind.speed} Km/h</li>
                <li>Latitude : {data.coord.lat}</li>
                <li>Longitude : {data.coord.lon}</li>
              </ul>
            </div>
          </div>
          <div className="right">
            <div className="top">
              <img src={svg1} alt="Illustration" />
            </div>
            <div className="bottom">
              <LocationOnIcon className="location-icon" />
              <p>{data.name}</p>
            </div>
          </div>
        </div>
      ) : (
        <Message msg="Loading..." />
      )}
    </>
  );
};

const Message = (props) => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <h1>{props.msg}</h1>
    </div>
  );
};

export default Homepage;
