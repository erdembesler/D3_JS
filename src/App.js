import React from "react";
import CurvedLine from "./screens/CurvedLine/CurvedLine";
import MainPage from "./screens/MainPage/MainPage";
import { Route, Switch } from "react-router-dom";

const App = () => (
  <Switch>
    <Route path="/curvedline" component={CurvedLine} />
    <Route exact path="/" render={(props) => <MainPage {...props} />} />
  </Switch>
);

export default App;
