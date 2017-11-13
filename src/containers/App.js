import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'
import BookView from './BookView'
import * as BooksAPI from  '../services/BooksAPI'

const SHELF_NAMES = ['currentlyReading','wantToRead','read','none']

class BooksApp extends React.Component {
  state = {
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
            shelfNames={SHELF_NAMES}
            currentBooks={this.state.currentBooks}
            updateCurrentBooks={this.getCurrentBooks}
          />
        )}/>
        <Route path='/search/:term?' render={(props,history) => (
          <Search
            {...props}
            shelfNames={SHELF_NAMES}
            currentBooks={this.state.currentBooks}
            updateCurrentBooks={this.getCurrentBooks}
          />
        )}/>
        <Route path='/book/:id' render={(props,history) => (
          <BookView
            {...props}
            shelfNames={SHELF_NAMES}
            currentBooks={this.state.currentBooks}
          />
        )}/>

      </div>
    );
  }

}

export default BooksApp
