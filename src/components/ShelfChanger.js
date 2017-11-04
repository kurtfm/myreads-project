import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as utils from '../utils/general'
import * as booksAPI from '../services/BooksAPI'

class ShelfChanger extends Component {
    static propTypes = {
        defaultSelection:PropTypes.string.isRequired,
        shelfNames: PropTypes.array.isRequired,
        bookId: PropTypes.string.isRequired,
        updated:PropTypes.func.isRequired
    }

    state = {
    }
    shelfChangeHandler = (event) =>{
        booksAPI.update({'id':this.props.bookId},event.target.value)
            .then(()=>{
                this.props.updated();
            })
            .catch((err)=>{console.log(`API ERROR: ${err}`)})

    }
    render(){
        const { defaultSelection, shelfNames} = this.props

        return (
            <div className="book-shelf-changer">
                <select value={defaultSelection} onChange={this.shelfChangeHandler} >
                    <option value="none" disabled>Move to...</option>
                    {shelfNames.map((shelf,index) =>(
                    <option key={index} value={shelf}>{utils.shelfNameConverter(shelf)}</option>
                    ))}
                </select>
            </div>
      )

    }
}

export default ShelfChanger