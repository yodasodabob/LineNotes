import React from 'react'
import LineNote from './LineNote'

const NotesDisplayer = (props) => {
    const sortNotes = (a, b) => {
        return b.match(/\d+/)[0] - a.match(/\d+/)[0]
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