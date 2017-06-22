import React from 'react'

// import './Actions.css'

const Actions = ({ note, removeNote }) => {
    return(
        <span className="Actions">
            <button
                type='button'
                className="remove button alert"
                onClick={() => removeNote(note)}
            >
                <i className="removeNote">Delete</i>
            </button>
        </span>
    )
}
export default Actions