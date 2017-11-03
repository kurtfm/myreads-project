import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import BookList from './BookList'
import * as utils from '../utils/general'

class BookShelf extends Component {
    static propTypes = {
        books:PropTypes.array.isRequired,
        shelvesToShow: PropTypes.array.isRequired
    };
    state = {
        query: ''
    }; 
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    };

    clearQuery = () => {
        this.setState({ query: '' })
    };

    render(){
        const { books, shelvesToShow} = this.props
        const { query } = this.state

        let showingBooks
        if(query){
            const match = new RegExp(escapeRegExp(this.state.query), 'i')
            showingBooks = books.filter((book) => match.test(book.name))
        }
        else{
            showingBooks = books
        }
        showingBooks.sort(sortBy('name'))

        let shelfNames = []

        function buildShelves(showingBooks){
          let shelving = []
          showingBooks.map((book) => {
            if(shelvesToShow.indexOf(book.shelf) !== -1 || shelvesToShow.indexOf('all') !== -1){
              if(shelfNames.indexOf(book.shelf) === -1){
                shelfNames.push(book.shelf)
                shelving[shelfNames.indexOf(book.shelf)] = []
              }
              shelving[shelfNames.indexOf(book.shelf)].push(book)
            }
            return true
          })
          return shelving;
        }

        const shelves = new buildShelves(showingBooks);
        console.log(shelves[0])
        return (

        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
            {shelves.map((shelf,index) => (
              <div key={index} className="bookshelf">
              <h2 className="bookshelf-title">{utils.shelfNameConverter(shelfNames[index])}</h2>
              <div className="bookshelf-books">
              <ol className="books-grid">
                    <BookList books={shelf} shelfNames={shelfNames} key={index}/>
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