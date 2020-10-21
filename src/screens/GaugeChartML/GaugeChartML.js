import React, { useRef, useEffect, useState } from "react";
import { select, arc, pie, interpolate } from "d3";
import useResizeObserver from "../../Utils/useResizeObserver";
import ml5 from "ml5";
import useInterval from "../../Utils/useInterval";
import "./GaugeChartML.css";

let classifier;

const GaugeChart = (props) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change

  const videoRef = useRef();
  const [gaugeData, setGaugeData] = useState([0.5, 0.5]);
  const [shouldClassify, setShouldClassify] = useState(false);

  useEffect(() => {
    classifier = ml5.imageClassifier("./my-model/model.json", () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        });
    });
  }, []);

  useInterval(() => {
    if (classifier && shouldClassify) {
      classifier.classify(videoRef.current, (error, results) => {
        if (error) {
          console.error(error);
          return;
        }
        results.sort((a, b) => b.label.localeCompare(a.label));
        setGaugeData(results.map((entry) => entry.confidence));
      });
    }
  }, 500);

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;

    const arcGenerator = arc().innerRadius(75).outerRadius(150);

    const pieGenerator = pie()
      .startAngle(-0.5 * Math.PI)
      .endAngle(0.5 * Math.PI)
      .sort(null);

    const instructions = pieGenerator(gaugeData);

    svg
      .selectAll(".slice")
      .data(instructions)
      .join("path")
      .attr("class", "slice")
      .attr("fill", (instruction, index) => (index === 0 ? "#ffcc00" : "#eee"))
      .style(
        "transform",
        `translate(${dimensions.width / 2}px, ${dimensions.height}px)`
      )
      .transition()
      .attrTween("d", function (nextInstruction, index) {
        // bonus, which wasn't in video 07:
        // animate chart initially, but setting initial instruction
        const initialInstruction = pieGenerator([0, 1])[index];
        const interpolator = interpolate(
          this.lastInstruction || initialInstruction,
          nextInstruction
        );
        this.lastInstruction = interpolator(1);
        return function (t) {
          return arcGenerator(interpolator(t));
        };
      });

    // draw the gauge
  }, [gaugeData, dimensions]);

  return (
    <>
      <h1>
        Am I there ? <br />
        <small>
          [{gaugeData[0].toFixed(2)}, {gaugeData[1].toFixed(2)}]
        </small>
      </h1>

      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg className={"svg"} ref={svgRef}></svg>
      </div>

      <button onClick={() => setShouldClassify(!shouldClassify)}>
        {shouldClassify ? "Stop classifying" : "Start classifying"}
      </button>
      <video
        className={"Video"}
        ref={videoRef}
        style={{ transform: "scale(-1, 1)" }}
        width="300"
        height="150"
      />
    </>
  );
};

export default GaugeChart;
