import React, { useState } from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'
import { range } from 'lodash'

export function PCViz({ width, height }) {
  const [hoveredTextTopic, setHoveredTextTopic] = useState('standard')
  const [hoveredBubbleTopic, setHoveredBubbleTopic] = useState('standard')
  const [hoveredWord, setHoveredWord] = useState('')

  console.log(hoveredBubbleTopic, 'HOVERED BUBBLE TOPIC')

  const margins = {
    top: 50,
    right: 50,
    left: 50,
    bottom: 50,
  }

  const defaultData = [
    {
      topic: 'standard',
      words: [
        { word: 'car', count: 45, topic: 1 },
        { word: 'white', count: 30, topic: 2 },
        { word: 'great', count: 26, topic: 3 },
        { word: 'gin', count: 72, topic: 4 },
        { word: 'new york', count: 23, topic: 5 },
        { word: 'daisy', count: 67, topic: 6 },
        { word: 'gatsby', count: 55, topic: 1 },
        { word: 'boat', count: 14, topic: 2 },
        { word: 'lake', count: 11, topic: 3 },
        { word: 'mountain', count: 13, topic: 4 },
        { word: 'states', count: 55, topic: 5 },
        { word: 'nicolas', count: 84, topic: 5 },
        { word: 'piano', count: 45, topic: 1 },
        { word: 'red', count: 30, topic: 2 },
        { word: 'shoe', count: 26, topic: 3 },
        { word: 'knit', count: 72, topic: 4 },
        { word: 'shop', count: 23, topic: 5 },
        { word: 'street', count: 67, topic: 6 },
        { word: 'bike', count: 55, topic: 1 },
        { word: 'light', count: 14, topic: 2 },
        { word: 'fish', count: 11, topic: 3 },
        { word: 'strike', count: 13, topic: 4 },
        { word: 'noise', count: 55, topic: 5 },
        { word: 'random', count: 84, topic: 5 },
        { word: 'sea', count: 55, topic: 1 },
        { word: 'ocean', count: 14, topic: 2 },
        { word: 'ship', count: 11, topic: 3 },
        { word: 'flight', count: 13, topic: 4 },
        { word: 'sonata', count: 55, topic: 5 },
        { word: 'adagio', count: 84, topic: 5 },
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
        { word: 'jaar', count: 50 },
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

  const orderedData = defaultData.map((d) => ({
    ...d,
    words: d.words.sort(function (a, b) {
      return b.count - a.count
    }),
  }))

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
    .domain([])
    .range(d3.range(margins.top, height - margins.bottom, 20))

  return (
    <div style={{ display: 'flex', backgroundColor: '#F6F6F6' }}>
      {/*  BUBBLES DIV */}
      <div>
        <BubbleTitle>Intertopic Distance Map (via multidimensional scaling)</BubbleTitle>
        <svg width={width} height={height}>
          {/* AXIS AND LABELS */}
          <g>
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
            <text
              x={width / 2 + 6}
              y={margins.top + 10}
              fontSize={11}
              fill={'#C4C4C4'}
              textAnchor={'start'}
            >
              PC1
            </text>
            <text
              x={margins.left}
              y={height / 2 + 15}
              fontSize={11}
              fill={'#C4C4C4'}
              textAnchor={'start'}
            >
              PC2
            </text>
          </g>
          {bubbleData.map((d, i) => (
            <g key={i}>
              <circle
                cx={xScaleBubble(d.pc1)}
                cy={yScaleBubble(d.pc2)}
                r={circleScale(d.sizeArea)}
                fill={
                  hoveredBubbleTopic === 'standard'
                    ? '#61BFE4'
                    : hoveredBubbleTopic === d.topic
                    ? '#FD6332'
                    : '#61BFE4'
                }
                opacity={
                  hoveredTextTopic === 'standard' || hoveredTextTopic === d.topic
                    ? 0.7
                    : hoveredBubbleTopic !== d.topic
                    ? 0.15
                    : 0.7
                }
                // opacity={
                //   hoveredBubbleTopic === d.topic
                //     ? 0.7
                //     : hoveredBubbleTopic === 'standard'
                //     ? 0.7
                //     : hoveredTextTopic === d.topic
                //     ? 0.7
                //     : 0.15
                // }

                strokeWidth={
                  hoveredTextTopic === 'standard' ? 0 : d.topic === hoveredTextTopic ? 3 : 0
                }
                stroke={'#3ca0c7'}
                strokeOpacity={
                  hoveredTextTopic === 'standard' ? 1 : d.topic === hoveredTextTopic ? 1 : 0
                }
                style={{
                  transitionProperty: 'opacity',
                  transitionDuration: '0.6s',
                }}
                // onMouseEnter={() => setHoveredBubbleTopic(d.topic)}
                // onMouseOut={() => setHoveredBubbleTopic('standard')}
              />
              <text
                x={xScaleBubble(d.pc1)}
                y={yScaleBubble(d.pc2) + 4}
                textAnchor="middle"
                style={{ textAlign: 'middle' }}
                opacity={
                  hoveredTextTopic === 'standard' ? 0.5 : d.topic === hoveredTextTopic ? 0.5 : 0.2
                }
              >
                {d.topic}
              </text>
              {/* CIRCLES FOR HOVER */}
              <circle
                cx={xScaleBubble(d.pc1)}
                cy={yScaleBubble(d.pc2)}
                r={circleScale(d.sizeArea) + 1}
                fill={'white'}
                opacity={0}
                onMouseEnter={() => setHoveredBubbleTopic(d.topic)}
                onMouseOut={() => setHoveredBubbleTopic('standard')}
              />
            </g>
          ))}
        </svg>
      </div>
      {/* // BARS DIV */}
      <div>
        <BarTitle>Top 30 Most Salient terms</BarTitle>
        <svg width={width} height={height}>
          {/* {range(0, 10000, 2000).map((d) => (
            <text key={d} x={margins.left + 15 + xScaleBars(d)} y={margins.top}>
              {d}
            </text>
          ))} */}
          {orderedData
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
                      hoveredBubbleTopic === 'standard'
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
                      setHoveredTextTopic('standard')
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
                      hoveredWord === '' ? 'regular' : hoveredWord === w.word ? 'bold' : 'regular'
                    }
                    opacity={hoveredWord === '' ? 1 : hoveredWord === w.word ? 1 : 0.5}
                    onMouseEnter={() => {
                      setHoveredTextTopic(w.topic)
                      setHoveredWord(w.word)
                    }}
                    onMouseOut={() => {
                      setHoveredTextTopic('standard')
                      setHoveredWord('')
                    }}
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
