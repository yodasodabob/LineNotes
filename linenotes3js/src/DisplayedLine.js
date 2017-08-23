import React from 'react'
import './DisplayedLine.css'

const DisplayedLine = (props) => {
    let actions = props.actions
    // if(actions.currentLine === props.lineNum) {
    //     if (props.line.split("")[0]){
    //         actions.changeActor(props.line)
    //         actions.changeLine(1, actions.currentLine)
    //     }
    // }
    
    return(
        <div className={ props.lineNum == actions.currentLine ? "currentLine" : "otherLine"}>
            {props.lineNum} - {props.line}
            <br/>
        </div>
    )
}

export default DisplayedLine