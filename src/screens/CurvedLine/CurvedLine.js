import React, { useRef, useEffect, useState } from "react";
import classes from "./CurvedLine.css";

import {
  select,
  line,
  curveCardinal,
  axisBottom,
  scaleLinear,
  axisRight,
} from "d3";

const CurvedLine = (props) => {
  const [data, setData] = useState([25, 30, 45, 60, 20, 65, 75]);
  const svgRef = useRef();

  useEffect(() => {
    console.log(svgRef);
    const svg = select(svgRef.current);

    const xScale = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);
    const yScale = scaleLinear().domain([0, 150]).range([150, 0]);

    const xAxis = axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((index) => index + 1);
    svg.select(".x-axis").style("transform", "translateY(149px)").call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select(".y-axis").style("transform", "translateX(299px)").call(yAxis);

    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", myLine)
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);
  return (
    <React.Fragment>
      <div className={"SvgContainer"}>
        <svg className={"Svg"} ref={svgRef}>
          <g className="x-axis"></g>
          <g className="y-axis"></g>
        </svg>
      </div>

      <br />
      <br />
      <br />
      <br />
      <button
        className={"UpdateButton"}
        onClick={() => setData(data.map((value) => value + 5))}
      >
        Update Data
      </button>
      <button
        className={classes.FilterButton}
        onClick={() => setData(data.filter((value) => value < 35))}
      >
        Filter Data
      </button>
    </React.Fragment>
  );
};

export default CurvedLine;
