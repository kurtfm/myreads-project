import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BookUtils from '../services/BookUtils'
import * as BooksAPI from  '../services/BooksAPI'
import './ShelfChanger.css'

class ShelfChanger extends Component {
    static propTypes = {
        defaultSelection:PropTypes.string.isRequired,
        shelfNames: PropTypes.array.isRequired,
        bookId: PropTypes.string.isRequired,
        updateBooks:PropTypes.func.isRequired,
        customClassName: PropTypes.string
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
            .catch((err)=>{
                console.log(`API ERROR: ${err}`)
            })
    }

    render(){
        const { shelfNames} = this.props
        const shelfChangerClass = "shelf-changer-base " + (this.props.customClassName || "book-shelf-changer")

        return (
            <div className={shelfChangerClass}>
                <select value={this.state.defaultSelection} onChange={this.shelfChangeHandler} >
                    <option value="none" disabled>Move to...</option>
                    {shelfNames.map((shelf,index) =>(
                    <option key={index} value={shelf}>{BookUtils.shelfNameConverter(shelf)}</option>
                    ))}
                </select>
            </div>
      )

    }
}

export default ShelfChanger