import React from 'react';

const IconLoader = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 96">
    <title>Loader Logo</title>
    <g transform="translate(-8.000000, -2.000000)">
      <g transform="translate(11.000000, 5.000000)">
        {/* The animation engine targets this 'B' ID to draw the inner letters */}
        <g
          id="B"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none">
          {/* Letter A */}
          <path d="M 17 65 L 27 25 L 37 65 M 21 51 L 33 51" />
          {/* Letter P */}
          <path d="M 45 65 L 45 25 L 53 25 L 58 30 L 58 40 L 53 45 L 45 45" />
        </g>
        {/* The Outer Hexagon */}
        <polygon
          id="Shape"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          points="39 0 0 22 0 67 39 90 78 68 78 23"
        />
      </g>
    </g>
  </svg>
);

export default IconLoader;
