import React, { Component } from 'react'
import './LineNote.css'

class LineNote extends Component {
    
    
    render() {
        // const 

        return(
            <li className="LineNote column medium-8">
                <row className="lineDetailsGroup">
                    <div className='lineDetails actor'>Actor: {this.props.thing.actor}</div>
                    <div className='lineDetails pageNum'>Page: {this.props.thing.pageNum}</div>
                    <div className='lineDetails issue'>Issue: {this.props.thing.issue}</div>
                </row>
                <div className='lineDetails fullLine'>Full line: {this.props.thing.fullLine}</div>
            </li>
        )
    }
}

export default LineNote