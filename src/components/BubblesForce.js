import React, { useState } from 'react'
import * as d3 from 'd3'
import { groupBy } from 'lodash'
import * as provinceData from '../data/clustersFinal.json'
import { Legend } from './Legend'
import { ForcesComponent } from './ForcesComponent'
import './dropmenu.css'

export function BubblesForce({ width, height }) {
  const [selectedZone, setSelectedZone] = useState('Province Of Vicenza')

  const uniqueZones = [...new Set(provinceData.map((d) => d.zone))]
  console.log(uniqueZones, 'UNIQUE ZONES')

  const dataFiltered = provinceData.filter((d) => d.zone === selectedZone)

  const clustersGrouped = groupBy(dataFiltered, (d) => d.clusterId)
  console.log(clustersGrouped, 'AAA')

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

  // SCALES
  const circleScale = d3.scaleSqrt().domain([0, 1]).range([0, 40])

  function simulationForces(clusterData, clusterIndex) {
    const simulation = d3

      .forceSimulation(clusterData)
      .force('charge', d3.forceManyBody().strength(60))
      .force('center', d3.forceCenter(xScale(clusterIndex), yScale(clusterIndex)))
      .force(
        'collision',
        d3.forceCollide().radius(function (d) {
          return circleScale(d.percentage)
        })
      )
    simulation.tick(150)

    return simulation
  }

  for (const element in clustersGrouped) {
    const data = clustersGrouped[element]
    simulationForces(data, element)
  }

  return (
    <div style={{ backgroundColor: '#F6F6F6' }}>
      <div className="select" style={{ position: 'absolute', left: '50px' }}>
        {/* SELECT */}
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
      <div>
        <ForcesComponent
          width={width}
          height={height}
          clustersGrouped={clustersGrouped}
          circleScale={circleScale}
        />
      </div>
      <div>
        {' '}
        <Legend width={width} height={height} />
      </div>
    </div>
  )
}
