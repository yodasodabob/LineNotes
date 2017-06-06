import React, { Component } from 'react'
import './LineNote.css'

class LineNote extends Component {
    
    
    render() {
        const thing = this.props.thing
        return(
            <tr className="LineNote">
                <td className="actor">{thing.actor}</td>
                <td className="pageNum">{thing.pageNum}</td>
                <td className="issue">{thing.issue}</td>
                <td className="fullLine">{thing.fullLine}</td>
            </tr>
        )
    }
}

export default LineNote