import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookList from '../components/BookList'
import SearchPossibles from '../components/SearchPossibles'
import sortBy from 'sort-by'
import _ from 'lodash'
import * as BookUtils from '../services/BookUtils'
import * as BooksAPI from  '../services/BooksAPI'
import './Search.css'

const WAIT_TIME = 1000;

class Search extends Component {
    static propTypes = {
        shelfNames:PropTypes.array.isRequired,
        currentBooks:PropTypes.array.isRequired,
        updateCurrentBooks:PropTypes.func.isRequired
    }
    static contextTypes = {
        router: PropTypes.object
    }
    state = {
        query: '',
        noResults:false,
        possibles: [],
        searchResults:[]
    }

    componentWillMount() {
        this.startTime = null;
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.searchResults.length > 0){
            this.updateSearchResults(this.state.searchResults,nextProps.currentBooks)
        }
    }

    searchBooks = (query) => {
        BooksAPI.search(query).then((results) => {
            if(results.error){
                this.clearBooks()
                this.noResults()
            }
            else{
                this.setState({noResults:false})
                this.updateSearchResults(results.sort(sortBy('name')),
                    this.props.currentBooks)
                this.setupSearchTerms(query)
            }
        })
        .catch((err) => {
            this.clearBooks()
            this.noResults()
        })
    }

    updateSearchResults = (searchResults,shelfBooks)=>{
        shelfBooks.forEach((book)=>{
            let resultToUpdate = _.findIndex(searchResults, (result) =>{
                return result.id === book.id;
            })
            if(resultToUpdate !== -1){
                searchResults[resultToUpdate].shelf = book.shelf
            }
         })
        this.setState({searchResults: searchResults})
    }

    searchInputHandler = (inpt)=>{
        let query =  inpt.trim()
        this.setState({query:inpt})
        if(this.isForcedLagOver){
            this.clearPossibles()
            if(query.length > 0){
                this.searchBooks(query)
            }
            else{
                this.clearBooks()
                this.setState({noResults:false})
            }
        }
    }

    isForcedLagOver = ()=>{
        const timeNow = Date.now()
        const lagOver = (timeNow - this.startTime) > WAIT_TIME
        this.startTime = lagOver ? timeNow : this.startTime
        return lagOver
    }

    setupSearchTerms = (query)=>{
        if(query.length > 1){
            const terms = BookUtils.findValidSearchTerms(query)
            this.setState({ possibles:  terms})
        }
    }

    handleShelfChange = (bookId,shelfName)=>{
        if(shelfName === 'none'){
            let bookToUpdate = _.findIndex(this.state.searchResults, (book) =>{
                return bookId === book.id
            })
            if(bookToUpdate !== -1){
                let updatedSearchResults = this.state.searchResults
                updatedSearchResults[bookToUpdate].shelf = shelfName
                this.setState({searchResults: updatedSearchResults})
            }
            this.props.updateCurrentBooks()
        }
    }

    clearBooks = () => {
        this.setState({searchResults:[]})
    }

    noResults = () => {
        this.setState({noResults:true})
    }

    clearPossibles = () => {
        this.setState({possibles:[]})
    }

    render(){
        let query = this.state.query;
        return (
        <div className="search-books">
            <div className="view-title">
                <h1>Add Books</h1>
            </div>
            <div className="search-books-bar">
            <Link className='close-search' to="#" onClick={this.context.router.history.goBack}>Close</Link>
              <div className="search-books-input-wrapper">
                <input
                type='search'
                placeholder='Search for a book'
                value={query}
                onChange={(event) => this.searchInputHandler(event.target.value)} />
              </div>
            </div>
            {this.state.noResults && (
                <div className="search-no-results">No Books found matching '{query}'</div>
            )}
            <div className="search-books-results">
                {this.state.possibles.length > 0 && (
                    <SearchPossibles terms={this.state.possibles} search={this.searchInputHandler} />
                )}
                {this.state.searchResults.length > 0 && (
                    <BookList books={this.state.searchResults} shelfNames={this.props.shelfNames} updateBooks={this.handleShelfChange} />

                )}
            </div>
        </div>
      )

    }
}

export default Search