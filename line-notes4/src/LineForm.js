import React, { Component } from 'react'
import './LineForm.css'

class LineForm extends Component {
    // state

    handleSubmit = (ev) => {
        debugger
        ev.preventDefault()
    }

    render() {
        return(
            <div>
                <form id="addNote" onSubmit={this.handleSubmit}>
                    <input type="text" name="actorName" placeholder='Enter Actor name'></input>
                    <input type="number" name="pageNum" placeholder='Enter page number'></input>
                    <input type="text" name="issue" placeholder='Enter issue'></input>
                    <input type="text" name="fullLine" placeholder='Enter full line'></input>
                    <button type="submit" className="button success">Add note</button>
                </form>
            </div>
        )
    }
}
export default LineForm