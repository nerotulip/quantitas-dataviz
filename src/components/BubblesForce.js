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

  const xScale = d3.scaleOrdinal().domain([]).range([400, 600])

  const yScale = d3.scaleLinear().domain([0, 200]).range([200, 400])

  const circleScale = d3.scaleSqrt().domain([1, 20]).range([5, 60])

  const radius = 10

  const simulation = d3
    .forceSimulation(forceData)
    .force('charge', d3.forceManyBody().strength(5))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force(
      'collision',
      d3.forceCollide().radius(function (d) {
        return circleScale(d.nReviews)
      })
    )

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
              strokeWidth={3}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
