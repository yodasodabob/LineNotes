import React, { Component } from 'react'

import LineForm from './LineForm'

class OptionsPanel extends Component {


    render() {
        let panelContent = null
        if (this.props.userType === 'ASM'){
            panelContent = <LineForm addNote={this.props.addNote} />
        } else if (this.props.userType === 'actor') {
            panelContent = <h1>you are an actor</h1>
        } else {
            panelContent = <div><h1>Sign in as a valid user type</h1></div>
        }
        
        
        return(
            <div>
                { panelContent }
            </div>
        )
    }
}

export default OptionsPanel