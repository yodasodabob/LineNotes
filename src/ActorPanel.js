import React, { Component } from 'react'
import './ActorPanel.css'

class ActorPanel extends Component {
    state = {
        filter: {
            show: null,
            date: null,
        }
    }

    componentWillMount() {
        const filter = {...this.state.filter}
        filter.show = this.getShowFromLocalStorage()
        const showOptions = this.generateOptions(this.props.notes, 'show')
        const showOptionsKeys = Object.keys(showOptions)
        filter.show = showOptions[showOptionsKeys[0]]
        localStorage.setItem('show', filter.show)
        const dates = this.generateOptions(this.props.notes, 'date', filter.show)
        const sortNotes = (a, b) => {
            let fa = a.split('-').join('')
            let fb = b.split('-').join('')
            return fb.match(/\d+/)[0] - fa.match(/\d+/)[0]
        }
        const dateKeysSort = Object.keys(dates).sort(sortNotes)
        filter.date = dates[dateKeysSort[0]]
        this.setState({ filter })
        this.changeNotes('date', 'show', filter.date, filter.show)
    }

    getShowFromLocalStorage() {
        const lsShow = localStorage.getItem('show')
        if (!lsShow) return
        return lsShow
    }

    generateOptions = (notes, option, showOption) => {
        let optionsObj = {}
        for (let property in notes) {
            if (notes.hasOwnProperty(property)) {
                if (!optionsObj[notes[property][option]]) {
                    if (option !== 'show') {
                        if (notes[property]['show'] === showOption) {
                            optionsObj[notes[property][option]]=notes[property][option]
                        }
                    } else {
                        optionsObj[notes[property][option]]=notes[property][option]
                    }
                }
            }
        }
        return (optionsObj)
    }

    changeNotes = (optParam1, optParam2, optionalq1, optionalq2) => {
        const options = {
            param1: optParam1,
            param2: optParam2,
            query1: optionalq1 ? optionalq1 : this.state.filter[optParam1],
            query2: optionalq2 ? optionalq2 : this.state.filter[optParam2],
        }
        this.props.changeNotesToDisplay(options)
    }

    changeHandler = (ev) => {
        ev.preventDefault()
        const filter = {...this.state.filter}
        if (filter[ev.target.name] !== ev.target.value) {
            filter[ev.target.name] = ev.target.value
        }
        this.setState({ filter })
        if (filter.date && filter.show) {
            this.changeNotes('date', 'show')
        }
    }

    render() {
        const sortNotes = (a, b) => {
            let fa = a.split('-').join('')
            let fb = b.split('-').join('')
            return fb.match(/\d+/)[0] - fa.match(/\d+/)[0]
        }
        let dateArray = this.generateOptions(this.props.notes, 'date', this.state.filter.show)
        let showArray = this.generateOptions(this.props.notes, "show")
        return(
            <div className="actorPanel column medium-2">
                <label htmlFor="date">Date to display</label>
                <select name="date" id="date" onChange={(ev) => this.changeHandler(ev)}>
                    {
                        Object
                        .keys(dateArray)
                        .sort(sortNotes)
                        .map(dateNum => <option id={dateArray[dateNum]} key={dateNum}>{dateArray[dateNum]}</option>)
                    }
                </select>
                <label htmlFor="show">Show to display</label>
                <select name="show" id="show" onChange={(ev) => this.changeHandler(ev)}> 
                    {
                        Object
                        .keys(showArray)
                        .map(showname => <option id={showArray[showname]} key={showname}>{showArray[showname]}</option>)
                    }
                </select>
            </div>
        )
    }
}

export default ActorPanel