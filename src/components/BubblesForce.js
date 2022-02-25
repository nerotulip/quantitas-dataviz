import React from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'
import * as forceData from '../data/clustersLau.json'
import { scaleLinear } from 'd3'
import { groupBy } from 'lodash'

console.log(forceData)
const dataHuesca = forceData.filter((d) => d.zone === 'benasque')

const clustersID = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

console.log(groupBy(dataHuesca, (d) => d.clusterId))
const clustersGrouped = groupBy(dataHuesca, (d) => d.clusterId)

for (const element in clustersGrouped) {
  console.log(clustersGrouped[element])
}

export function BubblesForce({ width, height }) {
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

  const circleScale = d3.scaleSqrt().domain([1, 20]).range([5, 60])

  const xScale = d3
    .scaleLinear()
    .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    .range([100, 200, 300, 400, 500, 100, 200, 300, 400, 500])

  const yScale = d3
    .scaleLinear()
    .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    .range([200, 200, 200, 200, 200, 500, 500, 500, 500, 500])

  const colorScale = d3
    .scaleOrdinal()
    .domain([
      'Tour and Activities',
      'Bars and Clubs',
      'Entertainment and events',
      'Transports and services',
      'Natural Sites',
      'Shopping',
      'Relax and Wellness',
    ])
    .range(['#B2D329', '#FF9900', '#61BFE4', '#5768FF', '#589322', '#BA3AE1', '#FF5A5A'])

  const simulation = d3
    // .forceSimulation(forceData.filter((d) => d.LivingLab === 'Huesca province'))
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
    simulation.tick(50)

    return simulation
  }

  return (
    <div style={{ backgroundColor: '#F6F6F6' }}>
      <svg width={width} height={height}>
        {/* GHOST CIRCLES, STROKE EFFECT */}
        <g>
          {forceDataMock
            // .filter((d) => d.LivingLab === 'Huesca province')
            .map((d, i) => (
              <circle
                key={i}
                r={circleScale(d.nReviews)}
                index={i}
                cx={d.x}
                cy={d.y}
                fill={''}
                strokeOpacity={1}
                stroke={'#E7E7E7'}
                strokeWidth={25}
              />
            ))}
        </g>
        {/* REAL CIRCLES */}
        <g>
          {forceDataMock.map((d, i) => (
            <circle
              key={i}
              r={circleScale(d.nReviews)}
              index={i}
              cx={d.x}
              cy={d.y}
              fill={colorScale(d.macro)}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
