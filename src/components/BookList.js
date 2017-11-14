import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookThumb from './BookThumb'

class BookList extends Component {
    static propTypes = {
        books:PropTypes.array.isRequired,
        shelfNames: PropTypes.array.isRequired,
        updateBooks:PropTypes.func.isRequired,
        setupSearchReturnUrl:PropTypes.func
    }

    state = {
        books:this.props.books
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ books: nextProps.books })
    }

    render(){
        const {shelfNames} = this.props
        return (
            <ol className="books-grid">
                {this.state.books.map((book,index) => (
                <li key={index} >
                    <BookThumb
                        setupSearchReturnUrl={this.props.setupSearchReturnUrl}
                        updateBooks={this.props.updateBooks} 
                        shelfNames={shelfNames} 
                        book={book}
                    />
                </li>
                ))}
            </ol>
      )
    }
}

export default BookList