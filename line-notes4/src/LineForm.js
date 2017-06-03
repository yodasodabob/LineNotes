import React, { Component } from 'react'
import './LineForm.css'

class LineForm extends Component {
    // props.addNote

    handleSubmit = (ev) => {
        ev.preventDefault()
        const note = ev.target
        this.props.addNote(note)
        note.reset()
    }

    render() {
        return(
            <div>
                <form id="addNote" onSubmit={this.handleSubmit}>
                    <input type='text' name='showName' placeholder='Enter name of show' required autoFocus />
                    <input type="text" name="actorName" placeholder='Enter Actor name' required></input>
                    <input type="number" name="pageNum" placeholder='Enter page number' required></input>
                    <input type="text" name="issue" placeholder='Enter issue' required></input>
                    <input type="text" name="fullLine" placeholder='Enter full line' required></input>
                    <button type="submit" className="button success">Add note</button>
                </form>
            </div>
        )
    }
}
export default LineForm