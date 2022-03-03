import React from 'react'

export function TooltipBubble({ hoveredBubble, colorScale }) {
  const styles = {
    left: `${hoveredBubble.x + 10}px`,
    top: `${hoveredBubble.y - 90}px`,
    position: 'absolute',
    width: '200px',

    color: 'black',
    'box-shadow': '0 4px 14px rgba(0,0,0,0.3) ',
    'border-radius': 15,
    'background-color': '#FFFEFE',
    'text-align': 'left',
    padding: '9px 14px ',
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
            <td colSpan="1" style={{ color: '#7C7C7C', fontSize: 12 }}>
              Reviews
            </td>
          </tr>
          <tr style={{ fontSize: 18, fontWeight: 'bold' }}>
            <td colSpan="1">{hoveredBubble.nReviews}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
