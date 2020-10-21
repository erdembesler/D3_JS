import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const Pokemon = (props) => {
  return (
    <>
      <div style={{ margin: "auto" }}>
        <Button onClick={() => props.history.push(`/curvedline`)}>
          CURVED LINE
        </Button>
        <Button onClick={() => props.history.push(`/animatedbar`)}>
          ANIMATED BAR
        </Button>
        <Button onClick={() => props.history.push(`/gaugechartml`)}>
          GAUGE CHARTML
        </Button>
        <Button onClick={() => props.history.push(`/bbtimeline`)}>
          BBTIMELINE
        </Button>
        <Button onClick={() => props.history.push(`/racingbarchart`)}>
          RACING BAR CHART
        </Button>
      </div>
    </>
  );
};

export default Pokemon;
