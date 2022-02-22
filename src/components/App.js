import React from 'react'
import styled from 'styled-components'
import { Bubbles } from './Bubbles'
import { BarText } from './BarText'

export class App extends React.Component {
  render() {
    return (
      <VizContainer>
        <div style={{ backgroundColor: '#F6F6F6' }}>
          <Bubbles height={700} width={600} />
        </div>
        <div style={{ backgroundColor: '#F6F6F6' }}>
          <BarText height={800} width={900} />
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
