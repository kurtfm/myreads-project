import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as utils from '../utils/general'
import * as BooksAPI from  '../services/BooksAPI'
import './ShelfChanger.css'

class ShelfChanger extends Component {
    static propTypes = {
        defaultSelection:PropTypes.string.isRequired,
        shelfNames: PropTypes.array.isRequired,
        bookId: PropTypes.string.isRequired,
        updateBooks:PropTypes.func.isRequired,
        overrideClassName: PropTypes.string
    }

    state = {
        defaultSelection:this.props.defaultSelection
    }

    componentWillReceiveProps(nextProps) {
        this.setState({defaultSelection:nextProps.defaultSelection})
    }

    shelfChangeHandler = (event) =>{
        BooksAPI.update({'id':this.props.bookId},event.target.value)
            .then(()=>{
                this.props.updateBooks()
            })
            .catch((err)=>{console.log(`API ERROR: ${err}`)})
    }

    render(){
        const { shelfNames} = this.props
        const shelfChangerClass = this.props.overrideClassName || "book-shelf-changer"

        return (
            <div className={shelfChangerClass}>
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