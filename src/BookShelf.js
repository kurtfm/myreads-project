import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

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

        let shelfNames = [];

        function buildShelves(showingBooks){
          let shelving = []
          const makeShelf = function(name){
            shelfNames.push(name)
            let ind = shelfNames.indexOf(name);
            let prettyName =name.replace(/([A-Z])/g, ' $1').trim()
            prettyName = prettyName.charAt(0).toUpperCase() + prettyName.slice(1)
            shelving[ind] = {}
            shelving[ind].prettyName = prettyName
            shelving[ind].books = []
          }
          showingBooks.map((book) => {
            if(shelvesToShow.indexOf(book.shelf) !== -1 || shelvesToShow.indexOf('all') !== -1){
              shelfNames.indexOf(book.shelf) !== -1 || makeShelf(book.shelf)
              shelving[shelfNames.indexOf(book.shelf)].books.push(book)
            }
          })
          return shelving;
        }

        let shelves = new buildShelves(showingBooks);

        console.log(shelves)

        return (

        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
            {shelves.map((shelf,index) => (
              <div key={index} className="bookshelf">
              <h2 className="bookshelf-title">{shelf.prettyName}</h2>
              <div className="bookshelf-books">
              <ol className="books-grid">
                  {shelf.books.map((book,index) => (
                    <li key={index} >
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${book.imageLinks.thumbnail})`
                              }}>
                          </div>
                          <div className="book-shelf-changer">
                            <select>
                              <option value="none" disabled>Move to...</option>
                              {shelfNames.map((shelf,index) =>(
                                <option key={index} value={shelf}>{shelves[index].prettyName}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        {book.authors.map((author,index) => (
                        <div key={index} className="book-authors">{author}</div>
                        ))}
                    </div>
                  </li>
                  ))}
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