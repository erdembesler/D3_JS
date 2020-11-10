import React from "react";
import CurvedLine from "./screens/CurvedLine/CurvedLine";
import MainPage from "./screens/MainPage/MainPage";
import AnimatedBar from "./screens/AnimatedBar/AnimatedBar";
import GaugeChartML from "./screens/GaugeChartML/GaugeChartML";
import BBTimeLine from "./screens/BBTimeLine/BBTimeLine";
import RacingBarChart from "./screens/RacingBarChart/RacingBarChart";
import Paradox from "./screens/Paradox/Paradox";
import TreeChart from "./screens/TreeChart/TreeChart";
import GeoChart from "./screens/GeoChart/GeoChart";
import BrushChart from "./screens/BrushChart/BrushChart";
import StackedBarChart from "./screens/StackedBarChart/StackedBarChart";
import ZoomableLineChart from "./screens/ZoomableLineChart/ZoomableLineChart";

import { Route, Switch } from "react-router-dom";

const App = () => (
  <Switch>
    <Route path="/animatedbar" component={AnimatedBar} />
    <Route path="/gaugechartml" component={GaugeChartML} />
    <Route path="/bbtimeline" component={BBTimeLine} />
    <Route path="/curvedline" component={CurvedLine} />
    <Route path="/racingbarchart" component={RacingBarChart} />
    <Route path="/paradox" component={Paradox} />
    <Route path="/treechart" component={TreeChart} />
    <Route path="/geochart" component={GeoChart} />
    <Route path="/brushchart" component={BrushChart} />
    <Route path="/stackedbarchart" component={StackedBarChart} />
    <Route path="/zoomablelinechart" component={ZoomableLineChart} />
    <Route exact path="/" render={(props) => <MainPage {...props} />} />
  </Switch>
);

export default App;
