import React from 'react'
import { Link } from 'react-router-dom'
import './ModuleButtons.css'
import SignOut from './SignOut'

const ModuleButtons = (props) => {
    let uniButtons = () => {
        return(
            <span>
                <Link to={'/'}>
                    <SignOut signOut={props.signOut} />
                </Link>
                <Link to={'/settings'}>
                    <button className="button primary">
                        Settings
                    </button>
                </Link>
                <Link to={'/lineNotes4'}>
                    <button className="button primary">
                        Line Notes
                    </button>
                </Link>
            </span>
        )
    }
    let varButtons = null
    switch (props.role) {
        case 'Actor':
            varButtons = () => {
                return(
                    <span>
                        {null}
                    </span>
                )
            }
        break;
        case 'ASM' || 'SM' || 'PA':
            varButtons = () => {
                return (
                    <span>
                        <Link to={'/lineNotes3js'}>
                            <button className="button primary">
                                LineNotes3js
                            </button>
                        </Link>
                    </span>
                )
            }  
        break;
        default:
            varButtons = null
    }
    return( 
        <div className="moduleButtons button-group">
            {uniButtons()}
            {varButtons ? varButtons() : null}
        </div>
  )
}

export default ModuleButtons