import React, { useEffect, useRef, useState } from "react";
import {
  select,
  scaleBand,
  axisBottom,
  stack,
  max,
  scaleLinear,
  axisLeft,
  stackOrderAscending,
} from "d3";
import useResizeObserver from "../../Utils/useResizeObserver";
import StackedAreaChart from "./StackedAreaChart";
import "./StackedBarChart.css";
const allKeys = ["🥑", "🍌", "🍆"];

const colors = {
  "🥑": "green",
  "🍌": "orange",
  "🍆": "purple",
};

const StackedBarChart = () => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  const [keys, setKeys] = useState(allKeys);
  const [data, setData] = useState([
    {
      year: 1980,
      "🥑": 10,
      "🍌": 20,
      "🍆": 30,
    },
    {
      year: 1990,
      "🥑": 20,
      "🍌": 40,
      "🍆": 60,
    },
    {
      year: 2000,
      "🥑": 30,
      "🍌": 45,
      "🍆": 80,
    },
    {
      year: 2010,
      "🥑": 40,
      "🍌": 60,
      "🍆": 100,
    },
    {
      year: 2020,
      "🥑": 50,
      "🍌": 80,
      "🍆": 120,
    },
  ]);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // stacks / layers
    const stackGenerator = stack().keys(keys).order(stackOrderAscending);
    const layers = stackGenerator(data);
    const extent = [
      0,
      max(layers, (layer) => max(layer, (sequence) => sequence[1])),
    ];

    // scales
    const xScale = scaleBand()
      .domain(data.map((d) => d.year))
      .range([0, width])
      .padding(0.25);

    const yScale = scaleLinear().domain(extent).range([height, 0]);

    // rendering
    svg
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr("fill", (layer) => colors[layer.key])
      .selectAll("rect")
      .data((layer) => layer)
      .join("rect")
      .attr("x", (sequence) => xScale(sequence.data.year))
      .attr("width", xScale.bandwidth())
      .attr("y", (sequence) => yScale(sequence[1]))
      .attr("height", (sequence) => yScale(sequence[0]) - yScale(sequence[1]));

    // axes
    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);
  }, [colors, data, dimensions, keys]);

  return (
    <React.Fragment>
      <h2>Stacked Area Chart with D3 </h2>
      <StackedAreaChart data={data} keys={keys} colors={colors} />

      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg className={"Svg"} ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>

      <div className="fields">
        {allKeys.map((key) => (
          <div key={key} className="field">
            <input
              id={key}
              type="checkbox"
              checked={keys.includes(key)}
              onChange={(e) => {
                if (e.target.checked) {
                  setKeys(Array.from(new Set([...keys, key])));
                } else {
                  setKeys(keys.filter((_key) => _key !== key));
                }
              }}
            />
            <label htmlFor={key} style={{ color: colors[key] }}>
              {key}
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={() =>
          setData([
            ...data,
            {
              year: Math.max(...data.map((d) => d.year)) + 10,
              "🥑": Math.round(Math.random() * 100),
              "🍌": Math.round(Math.random() * 125),
              "🍆": Math.round(Math.random() * 150),
            },
          ])
        }
      >
        Add data
      </button>
    </React.Fragment>
  );
};

export default StackedBarChart;
