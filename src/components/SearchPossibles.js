import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './SearchPossibles.css'

class SearchPossibles extends Component{
    static PropTypes = {
        terms: PropTypes.array.isRequired,
        search: PropTypes.func.isRequired
    }

    render(){
        const {terms,search} = this.props
        return (
            <ol className="search-matching-terms">
                {terms.map((term,index) => (
                    <li key={index}><button onClick={() => search(term)}>{term}</button></li>
                ))}
            </ol>
        )
    }
}
export default SearchPossibles