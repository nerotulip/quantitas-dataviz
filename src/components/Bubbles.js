import React from 'react'
import * as d3 from 'd3'

export function Bubbles({ width, height }) {
  const bubbleData = [
    { topic: 1, sizeArea: 10, pc1: 7, pc2: 13 },
    { topic: 2, sizeArea: 4, pc1: 2, pc2: -5 },
    { topic: 3, sizeArea: 5, pc1: -5, pc2: -7 },
    { topic: 4, sizeArea: 2, pc1: 12, pc2: 3 },
    { topic: 5, sizeArea: 15, pc1: -14, pc2: 3 },
    { topic: 6, sizeArea: 18, pc1: -14, pc2: 1 },
  ]

  const xScale = d3.scaleLinear().domain([-20, 20]).range([0, width])
  const yScale = d3.scaleLinear().domain([20, -20]).range([0, height])
  const circleScale = d3.scaleSqrt().domain([1, 20]).range([10, 50])

  return (
    <svg width={width} height={height}>
      {bubbleData.map((d, i) => (
        <g key={i}>
          <circle
            cx={xScale(d.pc1)}
            cy={yScale(d.pc2)}
            r={circleScale(d.sizeArea)}
            fill={'#61BFE4'}
            opacity={0.5}
          />
          <text x={xScale(d.pc1)} y={yScale(d.pc2) + 4} textAnchor="middle">
            {d.topic}
          </text>
        </g>
      ))}
    </svg>
  )
}
