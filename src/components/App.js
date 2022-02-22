import React from 'react'
import styled from 'styled-components'
import { Bubbles } from './Bubbles'

export class App extends React.Component {
  render() {
    return (
      <VizContainer>
        <div style={{ backgroundColor: '#F6F6F6' }}>
          <Bubbles height={600} width={600} />
        </div>
        <div>
          <h2>rects</h2>
        </div>
      </VizContainer>
    )
  }
}

const VizContainer = styled.div`
  font-size: 30
  display: inline-block
  background-color: black
`
