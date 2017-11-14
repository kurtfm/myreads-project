import React from 'react'
import { Route, Switch } from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf'
import Search from './Search'
import BookView from './BookView'
import * as BooksAPI from  '../services/BooksAPI'

const SHELF_NAMES = ['currentlyReading','wantToRead','read','remove']

class BooksApp extends React.Component {
  state = {
    currentBooks: []
  }
  componentDidMount() {
    this.getCurrentBooks()
  }

  /**
  * @description call books API to get all the current books in user shelves and set them in state
  */
  getCurrentBooks = ()=>{
      BooksAPI.getAll().then((latestBooks) => {
        this.setState({currentBooks:latestBooks})
      })
  }

  render() {
    return (
      <div className="App">
        <Switch>
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
          <Route path='*' exact={true} render={() => (
            <div>
              <div className="missing-view">
                Sorry! The page you are looking for can't be found.
                Here are your book shelves instead:
              </div>
              <BookShelf
                shelfNames={SHELF_NAMES}
                currentBooks={this.state.currentBooks}
                updateCurrentBooks={this.getCurrentBooks}
              />
            </div>
          )}/>
        </Switch>
      </div>
    );
  }

}

export default BooksApp
