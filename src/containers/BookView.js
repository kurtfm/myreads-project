import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ShelfChanger from '../containers/ShelfChanger'
import * as BooksAPI from  '../services/BooksAPI'
import { Link } from 'react-router-dom'
import './BookView.css'
import placeholderImage from '../images/no-thumbnail-placeholder.svg'

const bookViewShelfChangerClass = 'book-summary-shelf-changer'

class BookView extends Component {
    static propTypes = {
        shelfNames:PropTypes.array.isRequired,
        currentBooks:PropTypes.array.isRequired
      }
    static contextTypes = {
        router: PropTypes.object
    }
    state = {
        book:{},
        getBookAPI:{promiseResolved:false,success:false}
    }
    componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            this.getCurrentBook()
        }
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
            const image = book.hasOwnProperty('imageLinks') &&
                book.imageLinks.hasOwnProperty('thumbnail')  ?
                book.imageLinks.thumbnail : placeholderImage


            return (
                <div className="book-view">
                    <div className="view-title">
                        <h1>Book Summary</h1>
                    </div>
                    <Link className="back-home" to="#" onClick={this.context.router.history.goBack}>Back</Link>
                    <div className="book-summary">
                        <div className="book-summary-title">
                            <h2>{book.title||'<no title available>'}</h2>
                        </div>
                        <div className="book-summary-publish-date">
                            {book.publishedDate||''}
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
                        <div className="book-summary-description">
                            <div className="book-summary-top">
                                <div className="book-cover"
                                    style={{
                                        width: 128,
                                        height: 193,
                                        backgroundImage: `url(${image})`
                                        }}>
                                </div>
                                <ShelfChanger 
                                    shelfNames={shelfNames}
                                    defaultSelection={bookShelf}
                                    bookId={book.id}
                                    updateBooks={this.getCurrentBook}
                                    customClassName={bookViewShelfChangerClass}
                                />
                            </div>
                            {book.description || 'Sorry, no summary available.'}
                            {book.previewLink && (
                                <span> <a className="book-summary-more-info" href={book.previewLink}>More info at Google Books.</a></span>
                                )}
                            </div>
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