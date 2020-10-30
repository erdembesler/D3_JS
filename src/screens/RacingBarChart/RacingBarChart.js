import React, { useRef, useEffect, useState } from "react";
import { select, scaleBand, scaleLinear, max } from "d3";
import useResizeObserver from "../../Utils/useResizeObserver";
import useInterval from "../../Utils/useInterval";
import { Button } from "react-bootstrap";

const getRandomIndex = (array) => {
  return Math.floor(array.length * Math.random());
};

const RacingBarChart = () => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  const [iteration, setIteration] = useState(0);
  const [start, setStart] = useState(false);
  const [data, setData] = useState([
    {
      name: "alpha",
      value: 10,
      color: "#f4efd3",
    },
    {
      name: "beta",
      value: 15,
      color: "#cccccc",
    },
    {
      name: "charlie",
      value: 20,
      color: "#c2b0c9",
    },
    {
      name: "delta",
      value: 25,
      color: "#9656a1",
    },
    {
      name: "echo",
      value: 30,
      color: "#fa697c",
    },
    {
      name: "foxtrot",
      value: 35,
      color: "#fcc169",
    },
  ]);

  useInterval(() => {
    if (start) {
      const randomIndex = getRandomIndex(data);
      setData(
        data.map((entry, index) =>
          index === randomIndex
            ? {
                ...entry,
                value: entry.value + 10,
              }
            : entry
        )
      );
      setIteration(iteration + 1);
    }
  }, 500);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    // sorting the data
    data.sort((a, b) => b.value - a.value);

    const yScale = scaleBand()
      .paddingInner(0.1)
      .domain(data.map((value, index) => index)) // [0,1,2,3,4,5]
      .range([0, dimensions.height]); // [0, 200]

    const xScale = scaleLinear()
      .domain([0, max(data, (entry) => entry.value)]) // [0, 65 (example)]
      .range([0, dimensions.width]); // [0, 400 (example)]

    // draw the bars
    svg
      .selectAll(".bar")
      .data(data, (entry, index) => entry.name)
      .join((enter) =>
        enter.append("rect").attr("y", (entry, index) => yScale(index))
      )
      .attr("fill", (entry) => entry.color)
      .attr("class", "bar")
      .attr("x", 0)
      .attr("height", yScale.bandwidth())
      .transition()
      .attr("width", (entry) => xScale(entry.value))
      .attr("y", (entry, index) => yScale(index));

    // draw the labels
    svg
      .selectAll(".label")
      .data(data, (entry, index) => entry.name)
      .join((enter) =>
        enter
          .append("text")
          .attr(
            "y",
            (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5
          )
      )
      .text((entry) => `🐎 ... ${entry.name} (${entry.value} meters)`)
      .attr("class", "label")
      .attr("x", 10)
      .transition()
      .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5);
  }, [data, dimensions]);

  return (
    <>
      <h1>Racing Bar Chart</h1>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg className={"svg"} ref={svgRef}></svg>
      </div>
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <Button onClick={() => setStart(!start)}>
          {start ? "Stop the race" : "Start the race!"}
        </Button>
      </div>

      <p>Iteration: {iteration}</p>
    </>
  );
};

export default RacingBarChart;
