import React, { Component } from 'react'

class ActorPanel extends Component {
    state = {
        testArray: [0,1,2,3,4,5]
    }

    generateOptions = (notes) => {
        let optionsObj = {}
        for (let property in notes) {
            if (notes.hasOwnProperty(property)) {
                if (!optionsObj[notes[property].date]) {
                    optionsObj[notes[property].date]=notes[property].date
                }
            }
        }
        return (optionsObj)
    }

    render() {
        let dateArray = this.generateOptions(this.props.notes)

        return(
            <div className="actorPanel">
                <form className="changeDate">
                    <select name="date" id="date">
                        {
                            Object
                            .keys(dateArray)
                            .map(dateNum => <option id={dateArray[dateNum]} key={dateNum}>{dateArray[dateNum]}</option>)
                        }
                    </select>
                </form>
            </div>
        )
    }
}

export default ActorPanel