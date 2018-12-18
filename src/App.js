import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { recipes: [] };
  }

  doSearch() {
    const searchTerm = document.getElementById("search-input").value;

    let myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("X-Mashape-Key", "INSERTYOURKEYHERE");

    console.log(this.state.recipes);

    let req = new Request("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&limitLicense=false&number=10&ranking=1&ingredients=" + searchTerm);
    //let req = new Request("https://hn.algolia.com/api/v1/search?query=");
    fetch(req, { headers : myHeaders })
      .then(response => response.json())
      .then(data => this.setState({ recipes: data }));
  }

  render() {
    const { recipes } = this.state;

    return (
      <div className="App">
        <header>
          <h1>Recipe Suggester</h1>
        </header>
        <div className="SearchBar">
          <input 
            type="text" 
            name="search-input" 
            id="search-input"
            size="50" 
            placeholder="Enter a list of ingredients, separated by commas"/>
          <button className="search" onClick={this.doSearch.bind(this)}>Search</button>
        </div>
        <div className="SearchResults">
          <ul>
            {recipes.map(item => (
              <li key={item.title}>
                <img src={item.image} width="230" height="230" alt={item.title} />
                <a href="#">{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
