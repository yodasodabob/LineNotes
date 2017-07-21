import React from 'react'
import './DisplayedLine.css'

const DisplayedLine = (props) => {
    return(
        <div>
            {props.lineNum} - {props.line}
            <br/>
        </div>
    )
}

export default DisplayedLine