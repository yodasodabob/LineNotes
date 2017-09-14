import React, { Component } from 'react'
import LinesDisplayer from './LinesDisplayer'

class ScriptReader extends Component {
    state = {
        lines: null,
    }

    readFile = (ev) => {
        let reader = new FileReader();
        reader.onload = () => {
            let text = reader.result;
            let lines = text.split('\n');
            this.setState({ lines })
        };
        reader.readAsText(ev.target.files[0])
    }

    render() {
        
        return(
            <div>
                {this.state.lines ? 
                    <LinesDisplayer changeDate={this.props.changeDate} addNote={this.props.addNote} lines={this.state.lines} /> : 
                    <input type="file" onChange={this.readFile} accept=".txt, .doc, .rtf, .docx"/>
                }
            </div>
        )
    }
}

export default ScriptReader