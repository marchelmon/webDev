import React, { Component } from 'react'
import './App.css';
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allPokemon: [],
      searchResult: [],
    }
  }

  componentDidMount() {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=1200&offset=60")
      .then(res => res.json())
      .then(result => result.results)
      .then(pokemon => {
        this.setState({ allPokemon: pokemon })
        this.fetchAndDisplayRandomPokemon(pokemon)
      })
      .catch(error => console.log("Something went wrong", error))
  }

  onSearchChange = (event) => {
    let searchString = event.target.value.toLowerCase()
    if (searchString.length > 2) {
      this.getPokemonData(searchString)
    }
  }

  getPokemonData = (searchString) => {
    var pcount = 0
    const filteredPokemon = this.state.allPokemon.filter(pokemon => {
      if (pokemon.name.toLowerCase().includes(searchString) && pcount <= 15) {
        pcount++
        return true
      }
      return false
    })
    this.updatePokemonResult(filteredPokemon)
  }

  fetchAndDisplayRandomPokemon = (allPokemon) => {
    let randomPokemons = []
    for (var i=1; i<11; i++) {
      randomPokemons.push(allPokemon[Math.floor(Math.random() * 1000) + 1])
    }
    this.updatePokemonResult(randomPokemons)
  }

  updatePokemonResult = (pokemons) => {
    var pokemonResult = []
    Promise.all(pokemons.map(pokemon => {
      return fetch(pokemon.url)
        .then(res => res.json())
        .then(pmonResult => {
          const pmon = {
            name: pmonResult.name,
            img: pmonResult.sprites.front_default,
            exp: pmonResult.base_experience
          }
          pokemonResult.push(pmon)
        })
        .catch(error => console.log("Something went to shit", error))
    }))
      .then(() => this.setState({ searchResult: pokemonResult }))
      .catch(error => console.log("Something went to shit", error))
  }


  render() {
    return (
      <div className="tc">
        <h1 className="f2">Pokédex</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <CardList pokemon={this.state.searchResult} />
      </div>
    )
  }
}
export default App
