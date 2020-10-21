import React, { useRef, useEffect, useState } from "react";
import { select, min, max, scaleTime, scaleLinear, axisBottom } from "d3";
import useResizeObserver from "../../Utils/useResizeObserver";
import "./BBTimeLine.css";

const getDate = (dateString) => {
  const date = dateString.split("-");
  return new Date(date[2], date[0] - 1, date[1]);
};

const BBTimeline = () => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  const [bbEpisodes, setBbEpisodes] = useState([]);
  const [bbCharacters, setBbCharacters] = useState([]);
  const [highlight, setHighlight] = useState();

  useEffect(() => {
    fetch("https://www.breakingbadapi.com/api/characters?category=Breaking+Bad")
      .then((response) => response.ok && response.json())
      .then((characters) => {
        setBbCharacters(
          characters.sort((a, b) => a.name.localeCompare(b.name))
        );
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("https://www.breakingbadapi.com/api/episodes?series=Breaking+Bad")
      .then((response) => response.ok && response.json())
      .then((episodes) => {
        console.warn(episodes);
        setBbEpisodes(episodes);
      })
      .catch(console.error);
  }, []);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const minDate = min(bbEpisodes, (episode) => getDate(episode.air_date));
    const maxDate = max(bbEpisodes, (episode) => getDate(episode.air_date));

    const xScale = scaleTime()
      .domain([minDate, maxDate])
      .range([0, dimensions.width]);

    const yScale = scaleLinear()
      .domain([max(bbEpisodes, (episode) => episode.characters.length), 0])
      .range([0, dimensions.height]);

    svg
      .selectAll(".episode")
      .data(bbEpisodes)
      .join("line")
      .attr("class", "episode")
      .attr("stroke", (episode) =>
        episode.characters.includes(highlight) ? "blue" : "black"
      )
      .attr("x1", (episode) => xScale(getDate(episode.air_date)))
      .attr("y1", dimensions.height)
      .attr("x2", (episode) => xScale(getDate(episode.air_date)))
      .attr("y2", (episode) => yScale(episode.characters.length));

    const xAxis = axisBottom(xScale);
    svg
      .select(".x-axis")
      .style("transform", `translateY(${dimensions.height}px)`)
      .call(xAxis);

    // draw the gauge
  }, [bbEpisodes, dimensions, highlight]);

  return (
    <>
      <h1>Breaking Bad Timeline</h1>

      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg className={"Svg"} ref={svgRef}>
          <g className="x-axis" />
        </svg>
      </div>
      <h2>Select your character</h2>
      <select value={highlight} onChange={(e) => setHighlight(e.target.value)}>
        <option>Select character</option>
        {bbCharacters.map((character) => (
          <option key={character.name}>{character.name}</option>
        ))}
      </select>
    </>
  );
};

export default BBTimeline;
