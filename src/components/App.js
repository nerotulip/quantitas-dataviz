import React from 'react'
import { HomeViz } from './HomeViz'
import { PCViz } from './PCViz'

export class App extends React.Component {
  render() {
    return (
      <div>
        <HomeViz />
        <PCViz width={800} height={900} />
      </div>
    )
  }
}
