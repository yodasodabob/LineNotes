import React, { Component } from 'react'
import './ActorPanel.css'

class ActorPanel extends Component {
    state = {
        testArray: [0,1,2,3,4,5]
    }

    generateOptions = (notes, option) => {
        let optionsObj = {}
        for (let property in notes) {
            if (notes.hasOwnProperty(property)) {
                if (!optionsObj[notes[property][option]]) {
                    optionsObj[notes[property][option]]=notes[property][option]
                }
            }
        }
        return (optionsObj)
    }

    changeNotes = (ev, optparam) => {
        ev.preventDefault()
        const form = ev.target
        const options = {
            param: optparam,
            query: form.date.value
        }
        this.props.changeNotesToDisplay(options)
    }

    render() {
        let dateArray = this.generateOptions(this.props.notes, 'date')
        let showArray = this.generateOptions(this.props.notes, "show")
        return(
            <div className="actorPanel column medium-2">
                <form className="changeDrop" onSubmit={(ev) => {this.changeNotes(ev, 'date')}}>
                    <select name="date" id="date">
                        {
                            Object
                            .keys(dateArray)
                            .map(dateNum => <option id={dateArray[dateNum]} key={dateNum}>{dateArray[dateNum]}</option>)
                        }
                    </select>
                    <button type="submit" className="button success">Change date</button>
                </form>
                <form className="changeDrop" onSubmit={(ev) => {this.changeNotes(ev, 'show')}}>
                    <select name="show" id="date">
                        {
                            Object
                            .keys(showArray)
                            .map(showname => <option id={showArray[showname]} key={showname}>{showArray[showname]}</option>)
                        }
                    </select>
                    <button type='submit' className='button success'>Change Show</button>
                </form>
            </div>
        )
    }
}

export default ActorPanel