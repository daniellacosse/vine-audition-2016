import React from "react";
import View from "./_view.jsx";

export default class HorizonSVGLoader extends View {
  render() {
    return (
      <svg
        id="loading-icon"
        x="0px"
        y="0px"
      	viewBox="0 0 100.2 100"
        style={{ enableBackground: "new 0 0 100.2 100" }}
      >
        <line
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeMiterlimit="10"

          x1="50.1" y1="10.8" x2="50.1" y2="89.9"
        />
        <circle
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeMiterlimit="10"

          cx="50.1" cy="14.1" r="5"
        />
      </svg>
    );
  }
}
