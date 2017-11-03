import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as utils from '../utils/general'

class ShelfChanger extends Component {
    static propTypes = {
        defaultSelection:PropTypes.string.isRequired,
        shelfNames: PropTypes.array.isRequired
    };

    state = {};

    render(){
        const { defaultSelection, shelfNames} = this.props

        return (
            <div className="book-shelf-changer">
            <select value={defaultSelection}>
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