import React, { Component } from 'react'
import base from './base'
import ContentEditable from 'react-contenteditable'
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
        script: new ScriptInterpreter(this.props.lines),
        personnel: {}
    }

    componentWillMount() {
        if(!this.state.navStatus.currentLine){
            let navStatus = {...this.state.navStatus}
            navStatus.currentLine = 0
            this.setState({ navStatus })
        }
        const script = this.state.script
        if(!this.state.script.castList){
            base.fetch("Shows/SKM/castList", { context: this, })
            .then(data => {
                script.setCastList(data)
                this.setState({ script })
            })
        }
        this.ref = base.syncState("personnel", {
            context: this,
            state: "personnel"
        })
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

    sceneChangeHandler(ev) {
        let navStatus = {...this.state.navStatus}
        navStatus.currentLine = Number(ev.target.value)
        this.setState({ navStatus })
    }

    checkScriptScenesMade() {
        if (this.state.script) {
            if (!this.state.script.sceneList) {
                this.state.script.generateScenes(false)
            }

            return(
            <select name="sceneNav" id="sceneNav" onChange={this.sceneChangeHandler.bind(this)}>
                {
                    Object
                        .keys(this.state.script.sceneList)
                        .map(scene => 
                            <option value={this.state.script.sceneList[scene].sceneLine} id={this.state.script.sceneList[scene].sceneLine} key={scene}>{this.state.script.sceneList[scene].sceneName}</option>
                        )
                }
            </select>
            )
        }
    }

    generateNote(issue) {
        let noteObj = {}
        const lineProps = this.state.script.getLineProps(this.state.navStatus.currentLine)
        noteObj = {
            id: `note-${lineProps.line}-${Date.now()}`,
            actor: lineProps.speaker,
            pageNum: lineProps.line,
            issue: issue,
            fullLine: lineProps.fullLine,
        }
        this.props.addNote(noteObj, {...this.state.personnel})
    }

    keyPressHandler(ev, isCL = false) {
        switch (ev.key) {
            case "Enter":
                ev.preventDefault()
                if (isCL === true){
                    switch (ev.target.innerHTML.charAt(0)) {
                        case "#" :
                            const today = new Date()
                            this.props.changeDate({ 
                                target: {
                                    rehearseDate: {
                                        value: today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
                                    }
                                }
                            })
                            ev.target.innerHTML = ""
                            return
                        case "$":
                            const scenes = this.state.script.generateScenes(true)
                            const newLine = parseInt(ev.target.innerHTML.split("$")[1])
                            const sceneKeys = Object.keys(scenes)
                            if (scenes[sceneKeys[newLine]]){
                                this.setState({ navStatus:{ currentLine: scenes[sceneKeys[newLine]].sceneLine}})
                            } else {
                                alert("Invalid scene")
                            }
                            // let navStatus ={ currentLine: scenes[ev.target.innerHTML.split("#")[1]] }
                            ev.target.innerHTML = ""
                            return
                            break;
                        default:
                            null
                    }
                }
                if (ev.target.innerHTML !== ""){
                    this.generateNote(ev.target.innerHTML)
                    ev.target.innerHTML = ""
                    }
                this.changeLines(1, this.state.navStatus.currentLine)
                break;
            case "\`":
            case "\\":
                if (ev.target.innerHTML === "") {
                    ev.preventDefault()
                    this.changeLines(0-1, this.state.navStatus.currentLine)
                }
                break;
            default:
                null
                break;
        }

        
    }

    renderButtonPanel() {
        return(
        <span className="controlPanel">
            <button className="button success expanded lineNav" onClick={() => {this.changeLines((0 - 1), this.state.navStatus.currentLine)}}>Move one line up</button>
            <button className="button success expanded lineNav" onClick={() => {this.changeLines(1, this.state.navStatus.currentLine)}}>Move one line down</button>
            <ContentEditable className="userInput" id="userInput" placeholder="Issue" autoFocus onKeyPress={this.keyPressHandler.bind(this)} />
            <form className="changeRDate" id="changeRDate" onSubmit={this.props.changeDate}>
                <input type="date" name="rehearseDate" id="rehearseDate" required />
                <button type="submit" className="button primary">Change Date</button>
            </form>
            {this.checkScriptScenesMade()}
        </span>
        )
    }

    renderCommandLine(){
        return(
            <span className="controlPanel">
                <ContentEditable className="userInput" id="userInput" autoFocus onKeyPress={(ev) => this.keyPressHandler(ev, true)} />
                <p>Current date: {this.props.getCurrentInfo("date")}    Current scene: {this.state.script.lines[this.state.script.findScene(this.state.navStatus.currentLine)]}</p> 
            </span>
        )
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
                {this.renderCommandLine()}
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