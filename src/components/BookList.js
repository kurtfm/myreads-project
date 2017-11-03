import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SelfChanger from './ShelfChanger'

class BookList extends Component {
    static propTypes = {
        books:PropTypes.array.isRequired,
        shelfNames: PropTypes.array.isRequired
    };

    state = {};

    render(){
        const { books, shelfNames} = this.props

        return (
            <ol className="books-grid">
                {books.map((book,index) => (
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
                        <SelfChanger 
                            shelfNames={shelfNames}
                            defaultSelection={book.shelf}
                        />
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors.map((author,index) => (
                        <div key={index} className="book-authors">{author}</div>
                    ))}
                </div>
                </li>
                ))}
            </ol>
      )
    }
}

export default BookList