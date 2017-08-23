import React, { Component } from 'react'
import base from './base'
import './LineForm.css'

class LineForm extends Component {
    state = {
        personnel: null
    }

    componentWillMount() {
        base.fetch('personnel', {
            context: this,
        }).then(data => {
            const personnel = data
            this.setState({ personnel })
        })
    }

    pushActor() {
        if (window.confirm("Are you sure you want to push notes to actors? \nAll notes will be deleted from your userID!") === true) {
            this.props.pushToActor()
        }
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
        const form = ev.target
        const noteObj = {
            id: `note-${form.pageNum.value}-${Date.now()}`,
            actor: form.actorName.value,
            pageNum: form.pageNum.value,
            issue: form.issue.value,
            fullLine: form.fullLine.value,
        }
        this.props.addNote(noteObj, this.state.personnel)
        form.reset()
    }

    render() {
        return(
            <div className="column medium-2">
                <h4>{this.props.currentShow ? this.props.currentShow : 'No show set'}</h4>
                <h4>{this.props.date ? this.props.date : 'No date set'}</h4>
                <form className="noteForm" id="addNote" onSubmit={this.handleSubmit}>
                    <input type="text" name="actorName" placeholder='Enter Actor name' required autoFocus></input>
                    <input type="number" name="pageNum" placeholder='Enter page number' required></input>
                    <input type="text" name="issue" placeholder='Enter issue' required></input>
                    <input type="text" name="fullLine" placeholder='Enter full line' required></input>
                    <button type="submit" className="button success expanded">Add note</button>
                </form>
                <button className="button alert expanded" onClick={this.pushActor.bind(this)}>Push notes</button>
                <form className="changeShow" id="changeShow" onSubmit={this.props.changeShow}>
                    <input type='text' name='showName' placeholder='Enter name of show' required />
                    <button type='submit' className="button primary changeSubmit">Change Show</button>
                </form>
                <form className="changeDate" id="changeDate" onSubmit={this.props.changeDate}>
                    <input type="date" name="rehearseDate" id="rehearseDate" required />
                    <button type="submit" className="button primary">Change Date</button>
                </form>
            </div>
        )
    }
}

export default LineForm