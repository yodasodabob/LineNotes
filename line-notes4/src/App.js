import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'

import './App.css';
import base, { auth } from './base'
import LineForm from './LineForm'
import SignIn from './SignIn'
import SignOut from './SignOut'
import NotesDisplayer from './NotesDisplayer'
import OptionsPanel from './OptionsPanel'
// import Header from './Header'
// import { PublicRoute, PrivateRoute } from './RouteHelpers'

class App extends Component {
  state = {
      uid: null,
      notes: {},
      userInfo: {},
  }

  componentWillMount() {
    this.getUserFromLocalStorage()
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.authHandler({ user: user})
        }
      }
    )
  }

   getUserFromLocalStorage = () => {
    const uid = localStorage.getItem('uid')
    if (!uid) return
    this.setState({ uid })
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
      )
    this.ref = base.syncState(
      `personnel/${this.state.uid}/userInfo`,
      {
        context: this,
        state: 'userInfo'
      }
    )
    localStorage.setItem('uid', authData.user.id)
    this.setUpNotes()
  }


  // setCurrentPlay = (showName) => {
  //   this.currentPlay = showName
  // }

  lineNote(form) {
    return{
      id: `note-${form.pageNum.value}-${Date.now()}`,
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
      notes: {},
      role: null,
    }
    this.setState({ uid: null, notes: {updatedState} })
    auth.signOut()
    localStorage.removeItem('uid')
  }

renderNotes() {
    const actions = {
      saveNote: this.saveNote,
      // removeNote: this.removeNote,       //not yet implemented
    }

    const user = this.state.userInfo

    return(
      <div>
        {/*<SignOut signOut={this.signOut} />*/}
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
        <header>
          { this.state.uid ? <SignOut signOut={this.signOut} /> : <SignIn authHandler={this.authHandler} />}
        </header>
        { this.state.uid ? 
          (<OptionsPanel userType={this.state.userInfo.role} />, this.renderNotes()) :
          <h1>Please sign in to continue</h1>
        }
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
