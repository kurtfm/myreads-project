import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ShelfChanger from '../containers/ShelfChanger'
import * as BooksAPI from  '../services/BooksAPI'
import { Link } from 'react-router-dom'
import './BookView.css'

const bookViewShelfChangerClass = 'book-summary-shelf-changer'

class BookView extends Component {
    static propTypes = {
        shelfNames:PropTypes.array.isRequired,
        currentBooks:PropTypes.array.isRequired
      }

    state = {
        book:{},
        getBookAPI:{promiseResolved:false,success:false}
    }
    componentDidMount() {
        this.getCurrentBook()
      }
      getCurrentBook = ()=>{
          BooksAPI.get(this.props.match.params.id)
          .then((latestBook) => {
            this.setState({book:latestBook,getBookAPI:{promiseResolved:true,success:true}})
          })
          .catch((err) => {
              this.setState({getBookAPI:{promiseResolved:true,success:false}})
          })
      }

    render(){
        const book = this.state.book
        if(this.state.getBookAPI.success){
            console.log(book)
            const shelfNames = this.props.shelfNames
            const bookShelf = book.shelf || 'none'
            return (
                <div className="book-view">
                    <div className="list-books-title">
                        <h1>Book Summary</h1>
                    </div>
                    <Link className='back-home' to='/'>Back</Link>
                    <div className="book-summary">
                        <div className="book-summary-title">
                            <h2>{book.title}</h2>
                        </div>
                        <div className="book-summary-authors">
                        {(book.authors||[]).map((author,index) => (
                            <span key={index}>
                                {author}
                                {index !== book.authors.length-1 && (
                                    <span>, </span>
                                )}
                            </span>
                        ))}
                        </div>
                        <div className="book-description">
                            <div className="book-summary-top">
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
                                    updateBooks={this.getCurrentBook}
                                    overrideClassName={bookViewShelfChangerClass}
                                />
                            </div>
                            {book.description}</div>
                    </div>
                </div>
            )
        }
        else if(this.state.getBookAPI.promiseResolved && !this.state.getBookAPI.success){
            return (
                <div className="book-error">
                <Link className='close-search' to='/'>Back</Link>
                    Sorry this book does not exist!
                </div>
            )
        }
        else{
            return (
                <Link className='close-search' to='/'>Back</Link>
            )
        }


    }
}

export default BookView