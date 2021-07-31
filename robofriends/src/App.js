import React, { Component } from 'react'
import { robots } from './robots'
import CardList from './CardList'
import SearchBox from './SearchBox'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      robots: robots,
      searchfield: ''
    }
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value.toLowerCase() })
  }

  render() {
    const filteredRobots = this.state.robots.filter(robot => {
      return robot.name.toLowerCase().includes(this.state.searchfield)
    })
    return (
      <div className="tc">
        <h1>Robofriends</h1>
        <SearchBox searchChange={this.onSearchChange}/>
        <CardList robots={filteredRobots} />
      </div>
    )
  }
}
export default App
