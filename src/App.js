import React, { useRef, useEffect, useState } from "react";
import "./App.css";

import { select } from "d3";

function App() {
  const [data, setData] = useState([25, 40, 30, 60, 20]);
  const svgRef = useRef();

  useEffect(() => {
    console.log(svgRef);
    const svg = select(svgRef.current);
    svg
      .selectAll("circle")
      .data(data)
      .join((enter) => enter.append("circle"))
      .attr("r", (value) => value)
      .attr("cx", (value) => value * 2)
      .attr("cy", (value) => value * 2)
      .attr("stroke", "red");
  }, [data]);
  return (
    <React.Fragment>
      <svg ref={svgRef}></svg>
      <br />
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update Data
      </button>
      <button onClick={() => setData(data.filter((value) => value < 35))}>
        Filter Data
      </button>
    </React.Fragment>
  );
}

export default App;
