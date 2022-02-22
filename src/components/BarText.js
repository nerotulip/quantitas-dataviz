import React from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'

export function BarText({ width, height }) {
  const barData = [
    {
      topic: 1,
      words: [
        { word: 'car', count: Math.floor(Math.random() * 100) },
        { word: 'white', count: Math.floor(Math.random() * 100) },
        { word: 'great', count: Math.floor(Math.random() * 100) },
        { word: 'gin', count: Math.floor(Math.random() * 100) },
        { word: 'new york', count: Math.floor(Math.random() * 100) },
        { word: 'daisy', count: Math.floor(Math.random() * 100) },
        { word: 'gatsby', count: Math.floor(Math.random() * 100) },
        { word: 'boat', count: Math.floor(Math.random() * 100) },
        { word: 'lake', count: Math.floor(Math.random() * 100) },
        { word: 'mountain', count: Math.floor(Math.random() * 100) },
        { word: 'states', count: Math.floor(Math.random() * 100) },
      ],
    },
  ]

  const margins = {
    top: 30,
    right: 20,
    left: 50,
    bottom: 30,
  }

  const xScale = d3.scaleLinear().domain([0, 100]).range([0, 600])
  const yScale = d3
    .scaleOrdinal()
    .domain(['car', 'white', 'daisy', 'great', 'gin', 'new york', 'gatsby'])
    .range(d3.range(margins.top, 300, 15))

  console.log(barData.map((d) => d.words.map((w) => yScale(w.word))))
  console.log(yScale('white'))
  console.log(xScale(87))
  return (
    <div>
      <BarTitle>Top 30 Most Salient terms</BarTitle>
      <svg width={width} height={height}>
        {barData.map((d) =>
          d.words.map((w, i) => (
            <g key={i}>
              <rect
                x={margins.left + 15}
                y={yScale(w.word)}
                width={xScale(w.count)}
                height={10}
                key={i}
                fill={'#61BFE4'}
                rx={4}
                ry={4}
              />
              <text
                x={margins.left - 40}
                y={yScale(w.word) + 10}
                fill={'black'}
                fontSize={12}
                textAnchor="left"
              >
                {w.word}
              </text>
            </g>
          ))
        )}
      </svg>
    </div>
  )
}

const BarTitle = styled.div`
  font-size: 18px;
  color: black;
  font-weight: bold;
`
