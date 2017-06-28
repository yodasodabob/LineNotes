import React, { Component } from 'react'

import LineForm from './LineForm'

class OptionsPanel extends Component {


    render() {
        let panelContent = null
        if (this.props.userType === 'ASM'){
            panelContent = <LineForm pushToActor={this.props.pushToActor} changeForm={this.props.changeShow} addNote={this.props.addNote} {...this.props} />
        } else if (this.props.userType === 'Actor') {
            panelContent = <h1>You are an actor</h1>
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