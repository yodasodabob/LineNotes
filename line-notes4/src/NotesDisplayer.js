import React from 'react'
import LineNote from './LineNote'
import './NotesDisplayer.css'

const NotesDisplayer = (props) => {
    const sortNotes = (a, b) => {
        return a.match(/\d+/)[0] - b.match(/\d+/)[0]
  }

    return (
        <ul className="NoteList">
            {
                Object
                .keys(props.notes)
                .sort(sortNotes)
                .map(noteId => <LineNote
                                    {...props}
                                    thing={props.notes[noteId]}
                                    key={noteId}
                                />)
      }
        </ul>
    )
}

export default NotesDisplayer