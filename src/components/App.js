import React from 'react'
import { HomeViz } from './HomeViz'
import { PCViz } from './PCViz'
import { BubblesForce } from './BubblesForce'

export class App extends React.Component {
  render() {
    return (
      <div>
        <HomeViz />
        <PCViz width={800} height={900} />
        <div className="forceBubbles">
          <BubblesForce width={1200} height={600} />
        </div>
      </div>
    )
  }
}
