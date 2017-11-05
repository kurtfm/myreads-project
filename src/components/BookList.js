import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookThumb from './BookThumb'

class BookList extends Component {
    static propTypes = {
        books:PropTypes.array.isRequired,
        shelfNames: PropTypes.array.isRequired,
        updateBooks:PropTypes.func.isRequired,
        booksApi: PropTypes.object.isRequired
    }

    state = {
        books:this.props.books
    }

    render(){
        const {shelfNames} = this.props

        return (
            <ol className="books-grid">
                {this.state.books.map((book,index) => (
                <li key={index} >
                    <BookThumb updateBooks={this.props.updateBooks} shelfNames={shelfNames} booksApi={this.props.booksApi} book={book} />
                </li>
                ))}
            </ol>
      )
    }
}

export default BookList