import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import * as BooksAPI from  '../services/BooksAPI'
import BookShelf from '../components/BookShelf'
import Search from '../components/Search'

class BooksApp extends React.Component {
  state = {
    shelves:[],
    shelfNames:[],
    shelvesToShow:['all']
  }

  componentDidMount() {
    this.updateShelves()
  }

  updateShelves = ()=>{
    this.setState({shelves:[]})
    BooksAPI.getAll().then((latestBooks) => {
      const shelvesToShow = this.state.shelvesToShow
      let shelfs = []
      let shelving = []
        latestBooks.map((book) => {
          if(shelvesToShow.indexOf(book.shelf) !== -1 || shelvesToShow.indexOf('all') !== -1){
            if(shelfs.indexOf(book.shelf) === -1){
              shelfs.push(book.shelf)
              shelving[shelfs.indexOf(book.shelf)] = []
            }
            shelving[shelfs.indexOf(book.shelf)].push(book)
          }
          return true
        })
      this.setState({ shelves:shelving, shelfNames: shelfs})
    })
  }

  render() {
    return (
      <div className="App">
      <Route exact path='/' render={() => (
        <BookShelf
          shelves={this.state.shelves}
          shelfNames={this.state.shelfNames}
          updateShelves={this.updateShelves}
          booksApi={BooksAPI}
        />
      )}/>

      <Route path='/search' render={({ history }) => (
        <Search booksApi={BooksAPI} shelfNames={this.state.shelfNames} />
      )}/>
      </div>
    );
  }

}

export default BooksApp
