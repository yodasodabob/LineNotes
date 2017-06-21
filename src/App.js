import React, { Component } from 'react';
// import { Route, Redirect, Switch } from 'react-router-dom'

import './App.css';
import base, { auth } from './base'
// import LineForm from './LineForm'
import SignIn from './SignIn'
import SignOut from './SignOut'
import NotesDisplayer from './NotesDisplayer'
import OptionsPanel from './OptionsPanel'
import NewUserForm from './NewUserForm'
// import Header from './Header'
// import { PublicRoute, PrivateRoute } from './RouteHelpers'

class App extends Component {
  state = {
      uid: null,
      notes: {},
      userInfo: {},
      show: null,
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

  updateUserFromForm(ev) {
    debugger
    ev.preventDefault()
    const newForm = ev.target
    const userInfo = {...this.state.userInfo}
    userInfo['firstName'] = newForm.firstName
    userInfo['lastName'] = newForm.lastName
    userInfo['role'] = newForm.role
    this.setState({ userInfo })
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

  getUserID(actorName) {
    const personnel = base.fetch('personnel', { 
      context: this,
    })
    console.log(personnel)
  }

  lineNote(form) {
    let currentShow = form.showName.value
    this.setState({ currentShow })
    return{
      id: `note-${form.pageNum.value}-${Date.now()}`,
      show: form.showName.value,
      actor: form.actorName.value,
      actorUserId: this.getUserID(form.actorName.value),
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

  removeNote = (note) => {
    const notes = {...this.state.notes}
    notes[note.id] = null
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
      removeNote: this.removeNote,
    }

    // const user = this.state.userInfo

    return(
      <div>
        {/*<SignOut signOut={this.signOut} />*/}
        <OptionsPanel currentShow={this.state.show} userType={this.state.userInfo.role} addNote={this.addNote}/>
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
          ( this.state.userInfo.role ? this.renderNotes() : <NewUserForm formHandler={this.updateUserFromForm} />) :
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
