import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookList from './BookList'
import * as utils from '../utils/general'

class BookShelf extends Component {
    static propTypes = {
        shelves:PropTypes.array.isRequired,
        shelfNames:PropTypes.array.isRequired,
        updateShelves: PropTypes.func.isRequired,
        booksApi: PropTypes.object.isRequired
    }

    state = {
    }

    render(){
        const {shelves,shelfNames,updateShelves,booksApi} = this.props

        return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
            {(shelves||[]).map((shelf,index) => (
              <div key={index} className="bookshelf">
              <h2 className="bookshelf-title">{utils.shelfNameConverter(shelfNames[index])}</h2>
              <div className="bookshelf-books">
              <ol className="books-grid">
                    <BookList updateBooks={updateShelves} books={shelf} shelfNames={shelfNames} booksApi={booksApi} key={index}/>
                </ol>
              </div>
            </div>
            ))}
            </div>
          </div>
          <div className="open-search">
            <a href="/search">Add a book</a>
          </div>
        </div>
      )
    }
}

export default BookShelf