import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ShelfChanger from './ShelfChanger'

class BookThumb extends Component {
    static propTypes = {
        book:PropTypes.object.isRequired,
        updated:PropTypes.func.isRequired
    };

    state = {
        book: this.props.book
    }

    render(){
        const book = this.state.book
        const shelfNames = this.props.shelfNames

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail})`
                        }}>
                    </div>
                    <ShelfChanger 
                        shelfNames={shelfNames}
                        defaultSelection={book.shelf}
                        bookId={book.id}
                        updated={this.props.updated}
                    />
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors.map((author,index) => (
                    <div key={index} className="book-authors">{author}</div>
                ))}
            </div>
      )

    }
}

export default BookThumb