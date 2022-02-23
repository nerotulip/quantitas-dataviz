import React, { useState } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'

const [hoveredText, setHoveredText] = useState('default')

function BarText({ width, height }) {
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

  const defaultData = [
    {
      topic: 'default',
      words: [
        { word: 'car', count: Math.floor(Math.random() * 100), topic: 1 },
        { word: 'white', count: Math.floor(Math.random() * 100), topic: 2 },
        { word: 'great', count: Math.floor(Math.random() * 100), topic: 3 },
        { word: 'gin', count: Math.floor(Math.random() * 100), topic: 4 },
        { word: 'new york', count: Math.floor(Math.random() * 100), topic: 5 },
        { word: 'daisy', count: Math.floor(Math.random() * 100), topic: 6 },
        { word: 'gatsby', count: Math.floor(Math.random() * 100), topic: 1 },
        { word: 'boat', count: Math.floor(Math.random() * 100), topic: 2 },
        { word: 'lake', count: Math.floor(Math.random() * 100), topic: 3 },
        { word: 'mountain', count: Math.floor(Math.random() * 100), topic: 4 },
        { word: 'states', count: Math.floor(Math.random() * 100), topic: 5 },
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
    .range(d3.range(margins.top, 300, 20))

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
                x={margins.left + 12}
                y={yScale(w.word) + 10}
                fill={'black'}
                fontSize={12}
                textAnchor="end"
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

function Bubbles({ width, height }) {
  const bubbleData = [
    { topic: 1, sizeArea: 10, pc1: 7, pc2: 13 },
    { topic: 2, sizeArea: 4, pc1: 2, pc2: -5 },
    { topic: 3, sizeArea: 5, pc1: -5, pc2: -7 },
    { topic: 4, sizeArea: 2, pc1: 12, pc2: 3 },
    { topic: 5, sizeArea: 15, pc1: -14, pc2: 3 },
    { topic: 6, sizeArea: 18, pc1: -14, pc2: 1 },
    { topic: 7, sizeArea: 15, pc1: 3, pc2: 10 },
  ]

  const margins = {
    top: 30,
    right: 20,
    left: 20,
    bottom: 30,
  }

  const xScale = d3
    .scaleLinear()
    .domain([-20, 20])
    .range([margins.left, width - margins.right])
  const yScale = d3
    .scaleLinear()
    .domain([20, -20])
    .range([margins.top, height - margins.bottom])
  const circleScale = d3.scaleSqrt().domain([1, 20]).range([10, 50])

  //   const axesY = d3.axisBottom(xScale)

  return (
    <div>
      <BubbleTitle>Intertopic Distance Map (via multidimensional scaling)</BubbleTitle>
      <svg width={width} height={height}>
        <line
          x1={margins.left}
          y1={height / 2}
          x2={width - margins.right}
          y2={height / 2}
          stroke="#BDBDBD"
          opacity={0.8}
        />
        <line
          x1={width / 2}
          y1={margins.top}
          x2={width / 2}
          y2={height - margins.bottom}
          stroke="#BDBDBD"
          opacity={0.8}
        />
        {bubbleData.map((d, i) => (
          <g key={i}>
            <circle
              cx={xScale(d.pc1)}
              cy={yScale(d.pc2)}
              r={circleScale(d.sizeArea)}
              fill={'#61BFE4'}
              opacity={0.5}
            />
            <text
              x={xScale(d.pc1)}
              y={yScale(d.pc2) + 4}
              textAnchor="middle"
              style={{ 'text-aling': 'middle' }}
            >
              {d.topic}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

const BubbleTitle = styled.div`
  font-size: 18px;
  color: black;
  font-weight: bold;
`

const BarTitle = styled.div`
  font-size: 18px;
  color: black;
  font-weight: bold;
`
