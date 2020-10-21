import React from "react";
import CurvedLine from "./screens/CurvedLine/CurvedLine";
import MainPage from "./screens/MainPage/MainPage";
import AnimatedBar from "./screens/AnimatedBar/AnimatedBar";
import GaugeChartML from "./screens/GaugeChartML/GaugeChartML";
import BBTimeLine from "./screens/BBTimeLine/BBTimeLine";
import RacingBarChart from "./screens/RacingBarChart/RacingBarChart";
import TreeChart from "./screens/TreeChart/TreeChart";

import { Route, Switch } from "react-router-dom";

const App = () => (
  <Switch>
    <Route path="/animatedbar" component={AnimatedBar} />
    <Route path="/gaugechartml" component={GaugeChartML} />
    <Route path="/bbtimeline" component={BBTimeLine} />
    <Route path="/curvedline" component={CurvedLine} />
    <Route path="/racingbarchart" component={RacingBarChart} />
    <Route path="/treechart" component={TreeChart} />
    <Route exact path="/" render={(props) => <MainPage {...props} />} />
  </Switch>
);

export default App;
