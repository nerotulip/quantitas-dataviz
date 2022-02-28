import React, { useState } from 'react'
import * as d3 from 'd3'
import { range } from 'lodash'
import { TooltipBubble } from './TooltipBubble'

export function ForcesComponent({ width, height, clustersGrouped, circleScale }) {
  const [hoveredBubble, setHoveredBubble] = useState('')

  const colorScale = d3
    .scaleOrdinal()
    .domain([
      'Tour and Activities',
      'Bars and Clubs',
      'Entertainment and events',
      'Transports and services',
      'Natural sites',
      'Shopping',
      'Relax and wellness',
    ])
    .range(['#B2D329', '#FF9900', '#61BFE4', '#5768FF', '#589322', '#BA3AE1', '#FF5A5A'])

  return (
    <div>
      <svg width={width} height={height}>
        {/* GHOST CIRCLES, STROKE EFFECT */}
        <g>
          {range(10).map((index) =>
            clustersGrouped[index].map((d, i) => (
              <circle
                key={i}
                r={circleScale(d.nReviews)}
                index={i}
                cx={d.x}
                cy={d.y}
                fill={colorScale(d.macro)}
                strokeOpacity={1}
                stroke={'#E7E7E7'}
                strokeWidth={25}
              />
            ))
          )}
        </g>
        {/* REAL CIRCLES */}
        {range(10).map((index) =>
          clustersGrouped[index].map((bubble, i) => (
            <circle
              key={i}
              r={circleScale(bubble.nReviews)}
              index={i}
              cx={bubble.x}
              cy={bubble.y}
              stroke={'black'}
              strokeWidth={hoveredBubble === bubble ? 1 : 0}
              fill={colorScale(bubble.macro)}
              onMouseOver={() => setHoveredBubble(bubble)}
              onMouseOut={() => setHoveredBubble('')}
            />
          ))
        )}
      </svg>
      {hoveredBubble ? (
        <TooltipBubble
          hoveredBubble={hoveredBubble}
          x={hoveredBubble.x}
          y={hoveredBubble.y}
          colorScale={colorScale}
        />
      ) : null}
    </div>
  )
}
