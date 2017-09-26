import React, { Component } from 'react'
import LinesDisplayer from './LinesDisplayer'

class ScriptReader extends Component {
    state = {
        lines: null,
    }

    componentWillMount() {
        if (!this.state.lines) {
            const lines = JSON.parse(localStorage.getItem("lines"))
            if (lines) {this.setState({ lines })}
        }
    }

    removeLines() {
        let lines = {...this.state.lines}
        lines = null
        localStorage.removeItem("lines")
        this.setState({ lines })
    }

    readFile = (ev) => {
        let reader = new FileReader();
        reader.onload = () => {
            let text = reader.result;
            let lines = text.split('\n');
            this.setState({ lines })
            localStorage.setItem("lines", JSON.stringify(lines))
        };
        reader.readAsText(ev.target.files[0])
    }

    render() {
        
        return(
            <div>
                {this.state.lines ? 
                    <LinesDisplayer removeLines={this.removeLines.bind(this)} getCurrentInfo={this.props.getCurrentInfo} changeDate={this.props.changeDate} addNote={this.props.addNote} lines={this.state.lines} /> : 
                    <input type="file" onChange={this.readFile} accept=".txt, .doc, .rtf, .docx"/>
                }
            </div>
        )
    }
}

export default ScriptReader