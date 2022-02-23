import React, { useState } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'

export function PCViz({ width, height }) {
  const [hoveredTextTopic, setHoveredTextTopic] = useState('miao')
  console.log(hoveredTextTopic)
  console.log('IN')

  const margins = {
    top: 30,
    right: 20,
    left: 50,
    bottom: 30,
  }

  const barData = [
    {
      topic: 1,
      words: [
        { word: 'car', count: 24 },
        { word: 'white', count: 36 },
        { word: 'great', count: 12 },
        { word: 'gin', count: 6 },
        { word: 'new york', count: 30 },
        { word: 'daisy', count: 87 },
        { word: 'gatsby', count: 74 },
        { word: 'boat', count: 23 },
        { word: 'lake', count: 24 },
        { word: 'mountain', count: 91 },
        { word: 'states', count: 45 },
      ],
    },
  ]

  const defaultData = [
    {
      topic: 'default',
      words: [
        { word: 'car', count: 33, topic: 1 },
        { word: 'white', count: 33, topic: 2 },
        { word: 'great', count: 33, topic: 3 },
        { word: 'gin', count: 33, topic: 4 },
        { word: 'new york', count: 33, topic: 5 },
        { word: 'daisy', count: 33, topic: 6 },
        { word: 'gatsby', count: 33, topic: 1 },
        { word: 'boat', count: 33, topic: 2 },
        { word: 'lake', count: 33, topic: 3 },
        { word: 'mountain', count: 33, topic: 4 },
        { word: 'states', count: 33, topic: 5 },
        { word: 'nicolas', count: 33, topic: 5 },
      ],
    },
  ]

  const bubbleData = [
    { topic: 1, sizeArea: 10, pc1: 7, pc2: 13 },
    { topic: 2, sizeArea: 4, pc1: 2, pc2: -5 },
    { topic: 3, sizeArea: 5, pc1: -5, pc2: -7 },
    { topic: 4, sizeArea: 2, pc1: 12, pc2: 3 },
    { topic: 5, sizeArea: 15, pc1: -14, pc2: 3 },
    { topic: 6, sizeArea: 18, pc1: -14, pc2: 1 },
    { topic: 7, sizeArea: 15, pc1: 3, pc2: 10 },
  ]

  const xScaleBubble = d3
    .scaleLinear()
    .domain([-20, 20])
    .range([margins.left, width - margins.right])
  const yScaleBubble = d3
    .scaleLinear()
    .domain([20, -20])
    .range([margins.top, height - margins.bottom])
  const circleScale = d3.scaleSqrt().domain([1, 20]).range([10, 50])

  const xScaleBars = d3.scaleLinear().domain([0, 100]).range([0, 600])
  const yScaleBars = d3
    .scaleOrdinal()
    .domain(['car', 'white', 'daisy', 'great', 'gin', 'new york', 'gatsby'])
    .range(d3.range(margins.top, 300, 20))

  console.log(barData.map((d) => d.words.map((w) => yScaleBars(w.word))))
  console.log(yScaleBars('white'))
  console.log(xScaleBars(87))
  return (
    // BARS DIV
    <div style={{ display: 'flex' }}>
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
                cx={xScaleBubble(d.pc1)}
                cy={yScaleBubble(d.pc2)}
                r={circleScale(d.sizeArea)}
                fill={'#61BFE4'}
                opacity={
                  hoveredTextTopic === 'default' ? 0.5 : d.topic === hoveredTextTopic ? 0.5 : 0.2
                }
              />
              <text
                x={xScaleBubble(d.pc1)}
                y={yScaleBubble(d.pc2) + 4}
                textAnchor="middle"
                style={{ 'text-aling': 'middle' }}
                opacity={
                  hoveredTextTopic === 'default' ? 0.5 : d.topic === hoveredTextTopic ? 0.5 : 0.2
                }
              >
                {d.topic}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div>
        <BarTitle>Top 30 Most Salient terms</BarTitle>
        <svg width={width} height={height}>
          {defaultData.map((d) =>
            d.words.map((w, i) => (
              <g key={i}>
                <rect
                  x={margins.left + 15}
                  y={yScaleBars(w.word)}
                  width={xScaleBars(w.count)}
                  height={10}
                  key={i}
                  fill={'#61BFE4'}
                  rx={4}
                  ry={4}
                  onMouseEnter={() => setHoveredTextTopic(w.topic)}
                  onMouseOut={() => setHoveredTextTopic('miao')}
                />
                <text
                  x={margins.left + 12}
                  y={yScaleBars(w.word) + 10}
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
    </div>
  )
}

// STYLED COMPONENTS

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
