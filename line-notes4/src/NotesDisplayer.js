import React from 'react'
import LineNote from './LineNote'
import './NotesDisplayer.css'

const NotesDisplayer = (props) => {
    const sortNotes = (a, b) => {
        return a.match(/\d+/)[0] - b.match(/\d+/)[0]
  }

    return (
        <table className="NoteList">
            <thead>
                <tr>
                    <th className="actor">Actor</th>
                    <th className="page">Page</th>
                    <th className="issue">Issue</th>
                    <th className="fullLine">Full line</th>
                </tr>
            </thead>
            <tbody>
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
            </tbody>
        </table>
    )
}

export default NotesDisplayer