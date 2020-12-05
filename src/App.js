import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Error404 from "./components/404.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  // console.log(data);

  const [searched, setSearched] = useState();

  // useEffect(() => {}, [searched]);

  return (
    <div className="App">
      <Router>
        <Navbar callback={setSearched} />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Homepage {...props} query={searched} />}
          />
          <Route
            path="/home"
            render={(props) => <Homepage {...props} query={searched} />}
          />
          <Route path="/404" component={Error404} />
          <Redirect to="/404" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
