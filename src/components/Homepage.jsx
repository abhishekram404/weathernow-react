import React, { useEffect, useState } from "react";

import "./css/Homepage.css";
import axios from "axios";
import svg1 from "./assets/svg1.svg";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Loader from "./Loader";
const Homepage = (props) => {
  var [data, setData] = useState();
  var [lat, setLat] = useState("");
  var [lon, setLon] = useState("");
  var [isError, setError] = useState(false);
  var [searched, setSearched] = useState();

  useEffect(() => {
    setData(false);

    function getLoc() {
      var link;

      // If 'searched' state is defined , do this

      if (props.query) {
        if (props.query === searched) {
          if (isError) {
            return;
          }
          return;
        } else {
          setSearched(props.query);
        }
        link = `http://api.openweathermap.org/data/2.5/weather?q=${props.query}&units=metric&appId=b59f2b6e8322e621458fe6467f9c31db`;

        const getWeatherData = async () => {
          try {
            var weatherData = await axios(link);
          } catch (err) {
            setError(true);
            return;
          }

          setData(await weatherData.data);
          setError(false);

          console.log(await weatherData.data);
        };

        getWeatherData();
      }
      // If 'searched' is not defined , do this
      else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            setLat(position.coords.latitude.toString());
            setLon(position.coords.longitude.toString());

            if (lat && lon) {
              link = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appId=b59f2b6e8322e621458fe6467f9c31db`;

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
    }
    getLoc();
  }, [lat, lon, props]);
  return (
    <>
      {isError ? (
        <Message msg="Error Occured !!!" />
      ) : (
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
                  <span className="hidden">
                    <LocationOnIcon className="location-icon" />
                    <p>{data.name}</p>
                    <span>{data.sys.country}</span>
                  </span>
                </div>
              </div>
              <div className="right">
                <div className="layer"></div>
                <div className="top">
                  <img src={svg1} alt="Illustration" />
                </div>
                <div className="bottom">
                  <LocationOnIcon className="location-icon" />
                  <p>{data.name}</p>
                  <span>{data.sys.country}</span>
                </div>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </>
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
