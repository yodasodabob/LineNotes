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
      userInfo: {
        firstName: '',
        lastName: '',
        role: '',
      },
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
    this.getshowFromLocalStorage()
  }

  pushToActor() {
    let notes = {...this.state.notes}
    let targetNote = null
    for (let property in notes) {
      if (notes.hasOwnProperty(property)) {
        targetNote = notes[property]
        base.update(`personnel/${targetNote.actorUserId}/notes/${targetNote.id}`, { data: targetNote })
      }
    }
    notes = null
    this.setState({ notes })
  }

   getUserFromLocalStorage = () => {
    const uid = localStorage.getItem('uid')
    if (!uid) return
    this.setState({ uid })
  }

  getshowFromLocalStorage = () => {
    const show = localStorage.getItem('show')
    if (!show) return
    this.setState({ show })
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
    ev.preventDefault()
    const newForm = ev.target
    let userInfo = {...this.state.userInfo}
    userInfo['firstName'] = newForm.firstName.value
    userInfo['lastName'] = newForm.lastName.value
    userInfo['role'] = newForm.role.value
    this.setState({ userInfo },)
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


  lineNote(form, personnel) {
    let userID = null
    for (let property in personnel){
      if (personnel.hasOwnProperty(property)) {
        if (personnel[property].userInfo.firstName === form.actorName.value) {
          userID = property
        }
      }
    }
    return{
      id: `note-${form.pageNum.value}-${Date.now()}`,
      show: this.state.show,
      actor: form.actorName.value,
      pageNum: form.pageNum.value,
      issue: form.issue.value,
      fullLine: form.fullLine.value,
      actorUserId: userID,
    }
  }

  addNote = (form, personnel) => {
    const notes = {...this.state.notes}
    const note = this.lineNote(form, personnel)
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

  changeShow = (ev) => {
    ev.preventDefault()
    const show = ev.target.showName.value
    this.setState({ show })
    localStorage.setItem('show', show)
    ev.target.reset()
  }

renderNotes() {
    const actions = {
      saveNote: this.saveNote,
      removeNote: this.removeNote
    }

    // const user = this.state.userInfo

    return(
      <div>
        {/*<SignOut signOut={this.signOut} />*/}
        <OptionsPanel  pushToActor={this.pushToActor.bind(this)} changeShow={this.changeShow} currentShow={this.state.show} userType={this.state.userInfo.role} addNote={this.addNote}/>
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
          ( this.state.userInfo.role ? this.renderNotes() : <NewUserForm formHandler={this.updateUserFromForm.bind(this)} />) :
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