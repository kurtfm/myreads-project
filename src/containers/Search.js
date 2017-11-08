import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookList from '../components/BookList'
import SearchPossibles from '../components/SearchPossibles'
import sortBy from 'sort-by'
import * as utils from '../utils/general'
import * as BooksAPI from  '../services/BooksAPI'

const validSearchTerms = new utils.validSearchTerms()
const waitTime = 1000;

class Search extends Component {
    static propTypes = {
        shelfNames:PropTypes.array.isRequired,
        currentBooks:PropTypes.array.isRequired,
        updateCurrentBooks:PropTypes.func.isRequired
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
                this.updateSearchResults(results.sort(sortBy('name')),this.props.currentBooks)
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
            function isSameBook(result){
                return book.id === result.id
            }
            let resultToUpdate = searchResults.findIndex(isSameBook)
            if(resultToUpdate !== -1){
                searchResults[resultToUpdate].shelf = book.shelf
            }
         })
        this.setState({searchResults: searchResults})
    }

    searchInputHandler = (inpt)=>{
        const nowTime = Date.now()
        const lagOver = (nowTime - this.startTime) > waitTime || inpt.length === 0
        this.startTime = lagOver ? nowTime : this.startTime
        let query =  inpt.trim()
        this.setState({query:query})
        if(lagOver){
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

    setupSearchTerms = (query)=>{
        if(query.length > 1){
            const terms = validSearchTerms.find(query)
            this.setState({ possibles:  terms})
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
            <div className="search-books-bar">
            <Link className='close-search' to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                <input
                type='search'
                placeholder='Search by title or author'
                value={query}
                onChange={(event) => this.searchInputHandler(event.target.value)} />
              </div>
            </div>
            <div className="search-books-results">
                {this.state.noResults && (
                    <div>No Books found matching '{query}'</div>
                )}
                {this.state.possibles.length > 0 && (
                    <SearchPossibles terms={this.state.possibles} search={this.searchInputHandler} />
                )}
                {this.state.searchResults.length > 0 && (
                    <BookList books={this.state.searchResults} shelfNames={this.props.shelfNames} updateBooks={this.props.updateCurrentBooks} />

                )}
            </div>
        </div>
      )

    }
}

export default Search