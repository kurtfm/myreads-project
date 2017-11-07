import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ShelfChanger from '../containers/ShelfChanger'

class BookThumb extends Component {
    static propTypes = {
        book:PropTypes.object.isRequired,
        updateBooks:PropTypes.func.isRequired
    };

    state = {
        book: this.props.book
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ book: nextProps.book });
    }
    render(){
        const book = this.state.book
        const shelfNames = this.props.shelfNames
        const bookShelf = book.shelf || 'none'

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
                        defaultSelection={bookShelf}
                        bookId={book.id}
                        updateBooks={this.props.updateBooks}
                    />
                </div>
                <div className="book-title">{book.title}</div>
                {(book.authors||[]).map((author,index) => (
                    <div key={index} className="book-authors">{author}</div>
                ))}
            </div>
      )

    }
}

export default BookThumb