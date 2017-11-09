import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookList from '../components/BookList'
import * as BookUtils from '../services/BookUtils'
import './BookShelf.css'

class BookShelf extends Component {
  static propTypes = {
    shelfNames:PropTypes.array.isRequired,
    currentBooks:PropTypes.array.isRequired,
    updateCurrentBooks:PropTypes.func.isRequired
  }

  state = {
    shelvesToShow:['all'],
    shelves: []
  }

  componentDidMount() {
    this.buildShelves(this.props.currentBooks,this.state.shelvesToShow)
  }

  componentWillReceiveProps(nextProps) {
    this.buildShelves(nextProps.currentBooks,this.state.shelvesToShow)
  }

  buildShelves = (books,shelvesToShow)=>{
    const shelfs = this.props.shelfNames
    let shelving = []
    books.map((book) => {
      if(shelvesToShow.indexOf(book.shelf) !== -1 || shelvesToShow.indexOf('all') !== -1){
        if(!shelving[shelfs.indexOf(book.shelf)]){
          shelving[shelfs.indexOf(book.shelf)] = []
        }
        shelving[shelfs.indexOf(book.shelf)].push(book)
      }
      return true
    })
    this.setState({ shelves:shelving})
  }

  render(){
      const {shelfNames,updateCurrentBooks} = this.props
      return (
      <div className="list-books">
        <div className="view-title">
          <h1>Book Shelves</h1>
        </div>
        <div className="list-books-content">
          {this.state.shelves.map((shelf,index) => (
            <div key={index} className="bookshelf">
            <h2 className="bookshelf-title">{BookUtils.shelfNameConverter(shelfNames[index])}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                <BookList
                  updateBooks={updateCurrentBooks}
                  books={shelf} 
                  shelfNames={shelfNames}
                  key={index}
                />
              </ol>
            </div>
          </div>
          ))}
        </div>
        <div className="open-search">
          <a href="/search">Add a book</a>
        </div>
      </div>
    )
  }
}

export default BookShelf