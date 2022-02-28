import React, { useState } from 'react'
import styled from 'styled-components'

export function TooltipBubble({ hoveredBubble, x, y, colorScale }) {
  const styles = {
    left: `${x + 5}px`,
    top: `${y - 690}px`,
    position: 'relative',
    width: '180px',
    height: '70px',
    color: 'black',
    'box-shadow': `0 4px 15px`,
    'border-radius': 15,
    'background-color': '#FFFEFE',
  }
  return (
    <div className="TooltipBubble" style={styles}>
      <table>
        <thead>
          <tr style={{ color: colorScale(hoveredBubble.macro) }}>
            <th colSpan="2">{hoveredBubble.macro}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="1">Reviews</td>
          </tr>
          <tr>
            <td colSpan="1">{hoveredBubble.nReviews}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
