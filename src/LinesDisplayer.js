import React, { Component } from 'react'
import DisplayedLine from './DisplayedLine'
import './LinesDisplayer.css'
import ScriptInterpreter from './ScriptTools'

class LinesDisplayer extends Component {
    state = {
        navStatus: {
            currentLine: null,
            currentActor: null,
            currentScene: null,
        },
        script: new ScriptInterpreter(this.props.lines)
    }

    componentWillMount() {
        
        if(!this.state.navStatus.currentLine){
            let navStatus = {...this.state.navStatus}
            navStatus.currentLine = 0
            this.setState({ navStatus })
        }
    }

    getlines(lineMin, lineMax, list) {
        let returnList = {}
        for (let i = lineMin; i < lineMax; i++) {
            returnList[i] = list[i]
        }
        return(returnList)
    }

    changeLines(numToChange, currentLine) {
        let navStatus = {...this.state.navStatus}
        navStatus.currentLine = currentLine + numToChange
        this.setState({ navStatus })
    }

    renderLines() {
        const script = this.state.script
        const currentLine = this.state.navStatus.currentLine

        return(
            <div className="renderWrapper">
                <p className="nonPrimaryLine">{script.lines[currentLine-5]}</p>
                <p className="nonPrimaryLine">{script.lines[currentLine-4]}</p>
                <p className="nonPrimaryLine">{script.lines[currentLine-3]}</p>
                <p className="nonPrimaryLine">{script.lines[currentLine-2]}</p>
                <p className="nonPrimaryLine">{script.lines[currentLine-1]}</p>
                <DisplayedLine
                    script={script} 
                    currentLine={this.state.navStatus.currentLine} 
                    actions={null} 
                />
                <p className="nonPrimaryLine">{script.lines[currentLine+1]}</p>
                <p className="nonPrimaryLine">{script.lines[currentLine+2]}</p>
                <p className="nonPrimaryLine">{script.lines[currentLine+3]}</p>
                <p className="nonPrimaryLine">{script.lines[currentLine+4]}</p>
                <p className="nonPrimaryLine">{script.lines[currentLine+5]}</p>
            </div>

        )

    }

    render() {
        // let numLines = Object.keys(this.state.script.lines).length
        // let targLines = null
        // if (this.state.navStatus.currentLine < 5){
        //     targLines = this.getlines(0, this.state.navStatus.currentLine + 5, this.state.script.lines)
        // } else if (this.state.navStatus.currentLine > numLines - 5) {
        //     targLines = this.getlines(this.state.navStatus.currentLine - 5, this.state.navStatus.currentLine - numLines, this.state.script.lines)            
        // } else {
        //     targLines = this.getlines(this.state.navStatus.currentLine - 5, this.state.navStatus.currentLine + 5, this.state.script.lines)
        // }

        let actions = {
            currentLine: this.state.navStatus.currentLine,
            currentActor: this.state.navStatus.currentActor,
            changeActor: this.changeActor,
        }
        return (
            <div className='displayedLines'>
                <button className="button success" onClick={() => {this.changeLines((0 - 1), this.state.navStatus.currentLine)}}>Move one line up</button>
                <button className="button success" onClick={() => {this.changeLines(1, this.state.navStatus.currentLine)}}>Move one line down</button>
                {this.renderLines()}
                {/* {
                    Object
                    .keys(targLines)
                    .map(curLine => 
                        <DisplayedLine
                            line={this.state.lines[curLine]}
                            lineNum={curLine}
                            key={curLine} 
                            actions={actions}/>
                    )
                } */}
            </div>
        )
    }

}

export default LinesDisplayer