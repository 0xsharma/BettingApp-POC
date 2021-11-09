import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import ActivePools from "./pages/ActivePools";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/pools">
          <ActivePools />
        </Route>
        <Route exact path="/dash">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
