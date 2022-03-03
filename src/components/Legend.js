import React from 'react'
import * as d3 from 'd3'

export function Legend({ width, height }) {
  const styles = {
    left: `86px`,
    top: `50px`,
    position: 'relative',
    width: '570px',
    height: '165px',
    color: 'black',
    'box-shadow': '0 4px 14px rgba(0,0,0,0.3) ',
    'border-radius': 15,
    'background-color': '#FFFEFE',
  }
  return (
    <div>
      <div className="TooltipBubble" style={styles}>
        Legend
      </div>
    </div>
  )
}
