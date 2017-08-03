import React, { Component } from 'react'
import './LineNote.css'
import Actions from './Actions'

class LineNote extends Component {
    
    
    render() {
        const { thing, removeNote } = this.props
        return(
            <tr className="LineNote">
                <td className="actor">{thing.actor}</td>
                <td className="show">{thing.show}</td>
                <td className="pageNum">{thing.pageNum}</td>
                <td className="issue">{thing.issue}</td>
                <td className="fullLine">{thing.fullLine}</td>
                <td className="actions"><Actions note={thing} removeNote={removeNote} /> </td>
            </tr>
        )
    }
}

export default LineNote