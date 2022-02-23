import React, { useState } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'

export function PCViz({ width, height }) {
  const [hoveredTextTopic, setHoveredTextTopic] = useState('miao')
  const [hoveredBubbleTopic, setHoveredBubbleTopic] = useState('miao')
  const [hoveredWord, setHoveredWord] = useState('')

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
      topic: 'miao',
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
    {
      topic: 2,
      words: [
        { word: 'car', count: 43 },
        { word: 'white', count: 36 },
        { word: 'great', count: 12 },
        { word: 'gin', count: 6 },
        { word: 'new york', count: 30 },
        { word: 'daisy', count: 10 },
        { word: 'gatsby', count: 74 },
        { word: 'boat', count: 22 },
        { word: 'lake', count: 24 },
        { word: 'mountain', count: 91 },
        { word: 'states', count: 45 },
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
  const yScaleBars = d3.scaleOrdinal().domain([]).range(d3.range(margins.top, 300, 20))

  console.log(
    defaultData
      .filter((d) => d.topic === 1)[0]
      .words.sort(function (a, b) {
        return b.count - a.count
      }),
    'sxxs'
  )

  return (
    // BARS DIV
    <div style={{ display: 'flex', backgroundColor: '#F6F6F6' }}>
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
                fill={
                  hoveredBubbleTopic === 'miao'
                    ? '#61BFE4'
                    : hoveredBubbleTopic === d.topic
                    ? '#FD6332'
                    : 'white'
                }
                opacity={
                  hoveredTextTopic === 'miao' ? 0.7 : d.topic === hoveredTextTopic ? 0.5 : 0.2
                }
                strokeWidth={hoveredTextTopic === 'miao' ? 0 : d.topic === hoveredTextTopic ? 5 : 0}
                stroke={'blue'}
                strokeOpacity={1}
                style={{ 'transition-property': 'opacity', 'transition-duration': '0.8s' }}
                onMouseEnter={() => setHoveredBubbleTopic(d.topic)}
                onMouseOut={() => setHoveredBubbleTopic('miao')}
              />
              <text
                x={xScaleBubble(d.pc1)}
                y={yScaleBubble(d.pc2) + 4}
                textAnchor="middle"
                style={{ textAlign: 'middle' }}
                opacity={
                  hoveredTextTopic === 'miao' ? 0.5 : d.topic === hoveredTextTopic ? 0.5 : 0.2
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
          {defaultData
            .filter((d) => d.topic === hoveredBubbleTopic)
            .map((d) =>
              d.words.map((w, i) => (
                <g key={i}>
                  <rect
                    x={margins.left + 15}
                    y={yScaleBars(w.word)}
                    width={xScaleBars(w.count)}
                    height={10}
                    key={i}
                    fill={
                      hoveredBubbleTopic === 'miao'
                        ? '#61BFE4'
                        : hoveredBubbleTopic === d.topic
                        ? '#FD6332'
                        : 'white'
                    }
                    rx={4}
                    ry={4}
                    opacity={hoveredWord === '' ? 1 : hoveredWord === w.word ? 1 : 0.5}
                    onMouseEnter={() => {
                      setHoveredTextTopic(w.topic)
                      setHoveredWord(w.word)
                    }}
                    onMouseOut={() => {
                      setHoveredTextTopic('miao')
                      setHoveredWord('')
                    }}
                  />
                  <text
                    x={margins.left + 12}
                    y={yScaleBars(w.word) + 10}
                    fill={'black'}
                    fontSize={12}
                    textAnchor="end"
                    fontWeight={
                      hoveredWord === '' ? 'regulare' : hoveredWord === w.word ? 'bold' : 'regular'
                    }
                    opacity={hoveredWord === '' ? 1 : hoveredWord === w.word ? 1 : 0.5}
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
  position: absolute;
  left: 50px;
  font-size: 18px;
  color: black;
  font-weight: bold;
`

const BarTitle = styled.div`
  position: absolute;
  font-size: 18px;
  color: black;
  font-weight: bold;
`
