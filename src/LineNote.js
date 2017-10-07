import React, { Component } from 'react'
import './LineNote.css'
import Actions from './Actions'

class LineNote extends Component {
    
    
    render() {
        const { thing, removeNote, role } = this.props
        return(
            <tr className="LineNote">
                <td className="actor">{thing.actor}</td>
                <td className="show">{thing.scene}</td>
                <td className="lineNum">{thing.pageNum}</td>
                <td className="issue">{thing.issue}</td>
                <td className="fullLine">{thing.fullLine}</td>
                <td className="actions"><Actions role={role} note={thing} removeNote={removeNote} /> </td>
            </tr>
        )
    }
}

export default LineNote