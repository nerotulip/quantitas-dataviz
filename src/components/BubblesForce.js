import React from 'react'
import * as d3 from 'd3'
import styled from 'styled-components'

export function BubblesForce({ width, height }) {
  const forceData = [
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
  ]

  const xScale = d3.scaleOrdinal().domain([]).range([200, 300])

  const yScale = d3.scaleLinear().domain([0, 200]).range([100, 300])

  const circleScale = d3.scaleSqrt().domain([1, 20]).range([10, 50])

  const radius = 10

  const simulation = d3
    .forceSimulation(forceData)
    .force(
      'x',
      d3
        .forceX(function (d) {
          return xScale(d.macro)
        })
        .strength(0.03)
    )
    .force(
      'y',
      d3
        .forceY(function (d) {
          return yScale(d.nReviews)
        })
        .strength(0.09)
    )
    .force('collide', d3.forceCollide(12))

  //  Manually run simulation
  simulation.tick(10)
  return (
    <div>
      <svg width={width} height={height}>
        <g>
          {forceData.map((d, i) => (
            <circle
              key={i}
              r={circleScale(d.nReviews)}
              index={i}
              cx={d.x}
              cy={d.y}
              fill={'white'}
              stroke={'black'}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
