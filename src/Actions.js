import React from 'react'

// import './Actions.css'

const Actions = ({ role, note, removeNote }) => {
    return(
        <span className="Actions">
            {role === "ASM" || role === "SM}" ? 
                <button
                    type='button'
                    className="remove button alert"
                    onClick={() => removeNote(note)}
                >
                    <i className="removeNote">Delete</i>
                </button> :
                null
            }
        </span>
    )
}
export default Actions