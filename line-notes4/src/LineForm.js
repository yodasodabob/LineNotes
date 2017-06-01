import React, { Component } from 'react'
import './LineForm.css'

class LineForm extends Component {
    handleSubmit = (ev) => {
        ev.preventDefault()
    }

    render() {
        return(
            <div>
                <form id="addNote" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder='Enter Actor name'/>
                </form>
            </div>
        )
    }
}
export default LineForm