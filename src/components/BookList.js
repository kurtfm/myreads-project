import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookThumb from './BookThumb'

class BookList extends Component {
    static propTypes = {
        books:PropTypes.array.isRequired,
        shelfNames: PropTypes.array.isRequired,
        updated:PropTypes.func.isRequired
    };

    state = {};

    render(){
        const { books, shelfNames} = this.props

        return (
            <ol className="books-grid">
                {books.map((book,index) => (
                <li key={index} >
                    <BookThumb updated={this.props.updated} shelfNames={shelfNames} book={book} />
                </li>
                ))}
            </ol>
      )
    }
}

export default BookList