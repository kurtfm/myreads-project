import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import BookShelf from '../components/BookShelf'
import Search from './Search'
import BookView from './BookView'
import * as BooksAPI from  '../services/BooksAPI'

class BooksApp extends React.Component {
  state = {
    shelfNames: ['currentlyReading','wantToRead','read'],
    currentBooks: []
  }
  componentDidMount() {
    this.getCurrentBooks()
  }
  getCurrentBooks = ()=>{
      BooksAPI.getAll().then((latestBooks) => {
        this.setState({currentBooks:latestBooks})
      })
  }

  render() {
    return (
      <div className="App">

        <Route exact path='/' render={() => (
          <BookShelf
            shelfNames={this.state.shelfNames}
            currentBooks={this.state.currentBooks}
            updateCurrentBooks={this.getCurrentBooks}
          />
        )}/>

        <Route path='/search' render={({ history }) => (
          <Search
            shelfNames={this.state.shelfNames}
            currentBooks={this.state.currentBooks}
            updateCurrentBooks={this.getCurrentBooks}
          />
        )}/>

        <Route path='/book/:id' render={(props,history) => (
          <BookView
            {...props}
            shelfNames={this.state.shelfNames}
            currentBooks={this.state.currentBooks}
          />
        )}/>

      </div>
    );
  }

}

export default BooksApp
