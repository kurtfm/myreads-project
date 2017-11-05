import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as utils from '../utils/general'

class ShelfChanger extends Component {
    static propTypes = {
        defaultSelection:PropTypes.string.isRequired,
        shelfNames: PropTypes.array.isRequired,
        bookId: PropTypes.string.isRequired,
        updateBooks:PropTypes.func.isRequired,
        booksApi: PropTypes.object.isRequired
    }

    state = {
    }
    shelfChangeHandler = (event) =>{
        this.props.booksApi.update({'id':this.props.bookId},event.target.value)
            .then(()=>{
                this.props.updateBooks();
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