import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'

import './App.css';
import base, { auth } from './base'
import LineForm from './LineForm'
import SignIn from './SignIn'
import SignOut from './SignOut'
import NotesDisplayer from './NotesDisplayer'
// import { PublicRoute, PrivateRoute } from './RouteHelpers'

class App extends Component {
  state = {
      uid: null,
      notes: {},
  }

  componentWillMount() {
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.authHandler({ user: user})
        }
      }
    )
  }

  setUpNotes() {
    this.ref = base.syncState(
      `personnel/${this.state.uid}/notes`,
      {
        context: this,
        state: 'notes'
      }
    )
  }

authHandler = (authData) => {
    this.setState(
      { uid: authData.user.uid },
      this.setUpNotes())
  }

  // setCurrentPlay = (showName) => {
  //   this.currentPlay = showName
  // }

  lineNote(form) {
    return{
      id: `note-${Date.now()}`,
      show: form.showName.value,
      actor: form.actorName.value,
      pageNum: form.pageNum.value,
      issue: form.issue.value,
      fullLine: form.fullLine.value,
    }
  }

  addNote = (form) => {
    const notes = {...this.state.notes}
    const note = this.lineNote(form)
    notes[note.id] = note
    this.setState({ notes })
    
  }

  saveNote = (note) => {
    const notes = {...this.state.notes}
    notes[note.id] = note
    this.setState({ notes })
  }

  signOut = () => {
    const updatedState = {
      uid: null, 
      notes: {}
    }
    this.setState({ uid: null, notes: {updatedState} })
    auth.signOut()
  }

renderNotes() {
    const actions = {
      saveNote: this.saveNote,
      // removeNote: this.removeNote,       //not yet implemented
    }

    return(
      <div>
        <SignOut signOut={this.signOut} />
        <NotesDisplayer
          notes={this.state.notes}
          {...actions}
          />
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <LineForm addNote={this.addNote}/>
        { this.state.uid ? this.renderNotes() : <SignIn authHandler={this.authHandler}/> }
         {/*<Switch>
          <PrivateRoute path="/notes" authed={this.authed()} render={() => (
            <Main {...actions} notes={this.state.notes} />
          )} />
          <PublicRoute path="/sign-in" authed={this.authed()} render={() => (
            <SignIn authHandler={this.authHandler} />
          )} />
          <Route render={() => <Redirect to="/notes" />} />
        </Switch>
        <SignIn />
        <LineForm />*/}
      </div>
    );
  }
}

export default App;
