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
      </div>
    </>
  );
};

export default Pokemon;
