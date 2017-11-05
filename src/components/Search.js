import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookList from './BookList'
import SearchPossibles from './SearchPossibles'
import sortBy from 'sort-by'
import * as utils from '../utils/general'
const validSearchTerms = new utils.validSearchTerms()

class Search extends Component {
    static propTypes = {
        booksApi: PropTypes.object.isRequired,
        shelfNames: PropTypes.array.isRequired
    }

    state = {
        query: '',
        books: [],
        noResults:false,
        possibles: []
    }

    searchBooks = (query) => {
        this.setState({query:query})
        this.setState({ possibles:[]})
        if(query.length > 0){
            this.props.booksApi.search(query).then((results) => {
                if(results){
                    this.setState({noResults:false})
                    this.setState({books: results.sort(sortBy('name'))})
                    if(query.length > 2){
                        const terms = validSearchTerms.find(query)
                        this.setState({ possibles:  terms})
                    }
                }
            })
            .catch((err) => {
                this.setState({books: []})
                this.setState({noResults:true})
            })
        }
        else{
            this.setState({books:[]})
            this.setState({noResults:false})
        }
    }

    updateSearchBooks = (id,shelf)=>{
        let updatedBooks = []
        this.state.books.map((book,index) => {
            updatedBooks[index] = book
            updatedBooks[index].shelf = book.id === id ? shelf : book.shelf
            return false;
        })
        console.log(updatedBooks)
        this.setState({books:updatedBooks})
        return true
      }

    render(){
        let query = this.state.query;
        return (
        <div className="search-books">
            <div className="search-books-bar">
            <Link className='close-search' to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <input
                type='text'
                placeholder='Search by title or author'
                value={query}
                onChange={(event) => this.searchBooks(event.target.value)} />
              </div>
            </div>
            <div className="search-books-results">
                {this.state.noResults && (
                    <div>No Books found matching '{this.state.query}'</div>
                )}
                {this.state.possibles.length > 0 && (
                    <SearchPossibles terms={this.state.possibles} search={this.searchBooks} />
                )}
                {this.state.books.length > 0 && (
                    <BookList books={this.state.books} shelfNames={this.props.shelfNames} booksApi={this.props.booksApi} updateBooks={this.updateSearchBooks} />

                )}
            </div>
        </div>
      )

    }
}

export default Search