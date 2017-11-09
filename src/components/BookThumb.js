import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ShelfChanger from '../containers/ShelfChanger'
import { Link } from 'react-router-dom'
import './BookThumb.css'
import placeholderImage from '../images/no-thumbnail-placeholder.svg'

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
        const image = typeof book.imageLinks !== 'undefined' && 
            typeof book.imageLinks.thumbnail  !== 'undefined' ? 
            book.imageLinks.thumbnail : placeholderImage

        return (
            <div className="book">
                <div className="book-top">
                    <Link className="book-cover" to={`/book/${book.id}`}>
                        <img src={image} alt={book.title||''}/>
                    </Link>
                    <ShelfChanger 
                        shelfNames={shelfNames}
                        defaultSelection={bookShelf}
                        bookId={book.id}
                        updateBooks={this.props.updateBooks}
                    />
                </div>
                <div className="book-title">{book.title||''}</div>
                {(book.authors||[]).map((author,index) => (
                    <div key={index} className="book-authors">{author}</div>
                ))}
            </div>
      )

    }
}
export default BookThumb