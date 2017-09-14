import React , { Component} from 'react'
import './DisplayedLine.css'

class DisplayedLine extends Component {

    render() {
        return(
            <p className="currentLine">{this.props.script.lines[this.props.currentLine]}</p>
        )
    }
}

export default DisplayedLine