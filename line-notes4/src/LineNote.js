import React, { Component } from 'react'

class LineNote extends Component {
    
    
    render() {
        // const 

        return(
            <li className="details column medium-8">
                <p className='actor medium-2'>{this.props.thing.actor}</p>
            </li>
        )
    }
}

export default LineNote