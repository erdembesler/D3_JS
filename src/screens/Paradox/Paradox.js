import React, { useRef, useEffect, useState } from "react";
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from "d3";
import ResizeObserver from "resize-observer-polyfill";
import "./Paradox.css";
import { Button } from "react-bootstrap";

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null);
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

const BarChart = (props) => {
  const achillesSpeed = 100;
  const tortoiseSpeed = 50;

  const [achillesLoc, setAchillesLoc] = useState(0);
  const [tortoiseLoc, setTortoiseLoc] = useState(100);
  const [timePassed, setTimePassed] = useState(0);

  const [data, setData] = useState([tortoiseLoc - achillesLoc]);

  const svgRef = useRef();
  const svgRef2 = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);

    console.log(dimensions);

    setTimePassed(timePassed + data / (achillesSpeed - tortoiseSpeed));
    console.log(timePassed);
    if (!dimensions) return;

    // scales
    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, dimensions.width]) // change
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, (data * 3) / 2]) // todo
      .range([dimensions.height, 0]); // change

    // create x-axis
    const xAxis = axisBottom(xScale).ticks(data.length);
    svg
      .select(".x-axis")
      .style("transform", `translateY(${dimensions.height}px)`)
      .call(xAxis);

    // create y-axis
    const yAxis = axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", `translateX(${dimensions.width}px)`)
      .call(yAxis);

    // draw the bars
    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -dimensions.height)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", function (event, value) {
        // events have changed in d3 v6:
        // https://observablehq.com/@d3/d3v6-migration-guide#events
        const index = svg.selectAll(".bar").nodes().indexOf(this);
        svg
          .selectAll(".tooltip")
          .data([value])
          .join((enter) => enter.append("text").attr("y", yScale(value) - 4))
          .attr("class", "tooltip")
          .text(value)
          .attr("x", xScale(index) + xScale.bandwidth() / 2)
          .attr("text-anchor", "middle")
          .transition()
          .attr("y", yScale(value) - 8)
          .attr("opacity", 1);
      })
      .on("mouseleave", () => svg.select(".tooltip").remove())
      .transition()
      .attr("fill", "green")
      .attr("height", (value) => dimensions.height - yScale(value));
  }, [data, dimensions]);

  useEffect(() => {
    const svg2 = select(svgRef2.current);

    console.log(dimensions);

    setTimePassed(timePassed + data / (achillesSpeed - tortoiseSpeed));
    console.log(timePassed);
    if (!dimensions) return;

    // scales
    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, dimensions.width]) // change
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, 150]) // todo
      .range([dimensions.height, 0]); // change

    const colorScale = scaleLinear()
      .domain([75, 100])
      .range(["red", "green"])
      .clamp(true);

    // create x-axis
    const xAxis = axisBottom(xScale).ticks(data.length);
    svg2
      .select(".x-axis")
      .style("transform", `translateY(${dimensions.height}px)`)
      .call(xAxis);

    // create y-axis
    const yAxis = axisRight(yScale);
    svg2
      .select(".y-axis")
      .style("transform", `translateX(${dimensions.width}px)`)
      .call(yAxis);

    // draw the bars
    svg2
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (value, index) => xScale(index))
      .attr("y", -dimensions.height)
      .attr("width", xScale.bandwidth())
      .on("mouseenter", function (event, value) {
        // events have changed in d3 v6:
        // https://observablehq.com/@d3/d3v6-migration-guide#events
        const index = svg2.selectAll(".bar").nodes().indexOf(this);
        svg2
          .selectAll(".tooltip")
          .data([value])
          .join((enter) => enter.append("text").attr("y", yScale(value) - 4))
          .attr("class", "tooltip")
          .text(value)
          .attr("x", xScale(index) + xScale.bandwidth() / 2)
          .attr("text-anchor", "middle")
          .transition()
          .attr("y", yScale(value) - 8)
          .attr("opacity", 1);
      })
      .on("mouseleave", () => svg2.select(".tooltip").remove())
      .transition()
      .attr("fill", colorScale)
      .attr("height", (value) => dimensions.height - yScale(value));
  }, [data, dimensions]);

  return (
    <>
      <div style={{ marginBottom: "2rem" }}>
        Distance Between Achilles and Tortoise
      </div>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef} className={"Svg"}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef2} className={"Svg"}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
      <br />
      <br />

      <div style={{ textAlign: "center" }}>
        <Button onClick={() => setData(data.map((value) => value / 2))}>
          Go one more step
        </Button>
      </div>
    </>
  );
};

export default BarChart;
