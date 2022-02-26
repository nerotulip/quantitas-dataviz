import React from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'

export function Legend({ width, height }) {
  return (
    <svg width={width} height={height}>
      <defs>
        <filter id="f2" x="0" y="0" width="110%" height="110%">
          <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>
      <rect x={100} y={0} fill={'#FFFEFE'} width={570} height={165} rx={15} filter="url(#f2)" />
    </svg>
  )
}
