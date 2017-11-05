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
        defaultSelection:this.props.defaultSelection
    }
    shelfChangeHandler = (event) =>{
        const shelf = event.target.value
        const id = this.props.bookId
        this.props.booksApi.update({'id':id},shelf)
            .then((updatedBook)=>{
                this.setState({defaultSelection:shelf})
                this.props.updateBooks(id,shelf);
            })
            .catch((err)=>{console.log(`API ERROR: ${err}`)})

    }
    render(){
        const { shelfNames} = this.props

        return (
            <div className="book-shelf-changer">
                <select value={this.state.defaultSelection} onChange={this.shelfChangeHandler} >
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