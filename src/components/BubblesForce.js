import React, { useState } from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'
import * as forceData from '../data/clustersLau.json'
import { scaleLinear } from 'd3'
import { groupBy, uniqBy, range } from 'lodash'
import { Legend } from './Legend'
import { TooltipBubble } from './TooltipBubble'
import './dropmenu.css'

export function BubblesForce({ width, height }) {
  const [hoveredBubble, setHoveredBubble] = useState('')

  const zones = forceData.map((d) => d.zone)
  const uniqueZones = [...new Set(zones)]
  console.log(uniqueZones)
  const [selectedZone, setSelectedZone] = useState('benasque')

  const dataHuesca = forceData.filter((d) => d.zone === selectedZone)

  console.log(groupBy(dataHuesca, (d) => d.clusterId))
  const clustersGrouped = groupBy(dataHuesca, (d) => d.clusterId)
  console.log(clustersGrouped, 'AAA')
  const circleScale = d3.scaleSqrt().domain([0, 20]).range([0, 20])
  const xScale = d3
    .scaleLinear()
    .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .range([
      100 + 100,
      300 + 100,
      500 + 100,
      700 + 100,
      900 + 100,
      100 + 100,
      300 + 100,
      500 + 100,
      700 + 100,
      900 + 100,
    ])

  const yScale = d3
    .scaleLinear()
    .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    .range([200, 200, 200, 200, 200, 500, 500, 500, 500, 500])
  function simulationForces(clusterData, clusterIndex) {
    const simulation = d3

      .forceSimulation(clusterData)
      .force('charge', d3.forceManyBody().strength(60))
      .force('center', d3.forceCenter(xScale(clusterIndex), yScale(clusterIndex)))
      .force(
        'collision',
        d3.forceCollide().radius(function (d) {
          return circleScale(d.nReviews)
        })
      )
    simulation.tick(150)

    return simulation
  }

  for (const element in clustersGrouped) {
    const data = clustersGrouped[element]
    simulationForces(data, element)
  }

  const forceDataMock = [
    {
      clusterID: 0,
      macro: 'Tour and Activities',
      nReviews: 2,
      LivingLab: 'The Scheldeland region',
    },
    { clusterID: 0, macro: 'Bars and Clubs', nReviews: 2, LivingLab: 'The Scheldeland region' },
    {
      clusterID: 0,
      macro: 'Entertainment and events',
      nReviews: 5,
      LivingLab: 'The Scheldeland region',
    },
    {
      clusterID: 0,
      macro: 'Transports and services',
      nReviews: 8,
      LivingLab: 'The Scheldeland region',
    },
    {
      clusterID: 0,
      macro: 'Natural Sites',
      nReviews: 4,
      LivingLab: 'The Scheldeland region',
    },
    {
      clusterID: 0,
      macro: 'Shopping',
      nReviews: 1,
      LivingLab: 'The Scheldeland region',
    },
    {
      clusterID: 0,
      macro: 'Relax and Wellness',
      nReviews: 12,
      LivingLab: 'The Scheldeland region',
    },
  ]

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

  const simulation = d3
    .forceSimulation(forceDataMock)
    .force('charge', d3.forceManyBody().strength(60))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force(
      'collision',
      d3.forceCollide().radius(function (d) {
        return circleScale(d.nReviews)
      })
    )

  //  Manually run simulation
  simulation.tick(50)

  console.log(simulation, 'SIMULATION')
  console.log(forceDataMock, 'forceDataMock')

  console.log(hoveredBubble)
  return (
    <div style={{ backgroundColor: '#F6F6F6' }}>
      <div style={{ width: '200px' }}>
        <select
          className="search_categories"
          id="search_categories"
          onChange={() => setSelectedZone(document.getElementById('search_categories').value)}
        >
          {uniqueZones.map((d, i) => (
            <option key={i} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
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
      <div>
        {' '}
        <Legend width={width} height={height} />
      </div>
    </div>
  )
}
