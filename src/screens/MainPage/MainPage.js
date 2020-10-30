import React from "react";
import { Button } from "react-bootstrap";
import "./MainPage.css";

const Pokemon = (props) => {
  return (
    <>
      <div style={{ margin: "auto" }}>
        <Button
          className={"chartBtn"}
          onClick={() => props.history.push(`/curvedline`)}
        >
          CURVED LINE
        </Button>
        <Button
          className={"chartBtn"}
          onClick={() => props.history.push(`/animatedbar`)}
        >
          ANIMATED BAR
        </Button>
        <Button
          className={"chartBtn"}
          onClick={() => props.history.push(`/gaugechartml`)}
        >
          GAUGE CHARTML
        </Button>
        <Button
          className={"chartBtn"}
          onClick={() => props.history.push(`/bbtimeline`)}
        >
          BBTIMELINE
        </Button>
        <Button
          className={"chartBtn"}
          onClick={() => props.history.push(`/racingbarchart`)}
        >
          RACING BAR CHART
        </Button>
        <Button
          className={"chartBtn"}
          onClick={() => props.history.push(`/treechart`)}
        >
          TREE CHART
        </Button>
        <Button
          className={"chartBtn"}
          onClick={() => props.history.push(`/geochart`)}
        >
          GEO CHART
        </Button>
        <Button
          className={"chartBtn"}
          onClick={() => props.history.push(`/brushchart`)}
        >
          BRUSH CHART
        </Button>
        <Button
          className={"chartBtn"}
          onClick={() => props.history.push(`/stackedbarchart`)}
        >
          STACKED BAR CHART
        </Button>
        <Button
          className={"chartBtn"}
          onClick={() => props.history.push(`/zoomablelinechart`)}
        >
          ZOOMABLE LINE CHART
        </Button>
      </div>
    </>
  );
};

export default Pokemon;
