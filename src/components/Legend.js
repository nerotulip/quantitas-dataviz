import React from 'react'
import styled from 'styled-components'
import * as d3 from 'd3'

export function Legend({ width, height }) {
  const styles = {
    left: `86px`,
    top: `50px`,
    position: 'relative',
    width: '570px',
    height: '165px',
    color: 'black',
    'box-shadow': `0 4px 15px`,
    'border-radius': 15,
    'background-color': '#FFFEFE',
  }
  return (
    <div>
      <div className="TooltipBubble" style={styles}>
        ofelia
      </div>
    </div>
  )
}
