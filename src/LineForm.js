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
            <div className="column medium-2">
                <form className="noteForm" id="addNote" onSubmit={this.handleSubmit}>
                    <input type='text' name='showName' placeholder='Enter name of show' content={this.props.currentShow} required />
                    <input type="text" name="actorName" placeholder='Enter Actor name' required autoFocus></input>
                    <input type="number" name="pageNum" placeholder='Enter page number' required></input>
                    <input type="text" name="issue" placeholder='Enter issue' required></input>
                    <input type="text" name="fullLine" placeholder='Enter full line' required></input>
                    <button type="submit" className="button success expanded">Add note</button>
                    <button className="button alert expanded">Push notes</button>
                </form>
            </div>
        )
    }
}
export default LineForm