import React, { Component } from 'react'

import LineForm from './LineForm'
import ActorPanel from './ActorPanel'

class OptionsPanel extends Component {


    render() {
        let panelContent = null
        if (this.props.userType === 'ASM' || this.props.userType === 'SM' || this.props.userType === 'PA'){
            panelContent = <LineForm date={this.props.date}changeDate={this.props.changeDate} pushToActor={this.props.pushToActor} changeForm={this.props.changeShow} addNote={this.props.addNote} {...this.props} />
        } else if (this.props.userType === 'Actor') {
            panelContent = <ActorPanel changeNotesToDisplay={this.props.changeNotesToDisplay} notes={this.props.notes}/>
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