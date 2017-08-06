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

    changeNotes = (ev, optParam1, optParam2) => {
        ev.preventDefault()
        const form = ev.target
        const options = {
            param1: optParam1,
            param2: optParam2,
            query1: form[optParam1].value,
            query2: form[optParam2].value,
        }
        this.props.changeNotesToDisplay(options)
    }

    render() {
        const sortNotes = (a, b) => {
            let fa = a.split('-').join('')
            let fb = b.split('-').join('')
            console.log(fa.match(/\d+/)[0] - fb.match(/\d+/)[0])
            return fb.match(/\d+/)[0] - fa.match(/\d+/)[0]
        }
        let dateArray = this.generateOptions(this.props.notes, 'date')
        let showArray = this.generateOptions(this.props.notes, "show")
        return(
            <div className="actorPanel column medium-2">
                <form className="changeDrop" onSubmit={(ev) => {this.changeNotes(ev, 'date', 'show')}}>
                    <select name="date" id="date">
                        {
                            Object
                            .keys(dateArray)
                            .sort(sortNotes)
                            .map(dateNum => <option id={dateArray[dateNum]} key={dateNum}>{dateArray[dateNum]}</option>)
                        }
                    </select>
                    <select name="show" id="show">
                        {
                            Object
                            .keys(showArray)
                            .map(showname => <option id={showArray[showname]} key={showname}>{showArray[showname]}</option>)
                        }
                    </select>
                    <button type="submit" className="button success">Filter Notes</button>
                </form>
            </div>
        )
    }
}

export default ActorPanel