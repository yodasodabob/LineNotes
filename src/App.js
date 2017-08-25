import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.css';
import base, { auth } from './base'
// import LineForm from './LineForm'
import SignIn from './SignIn'
import NotesDisplayer from './NotesDisplayer'
import OptionsPanel from './OptionsPanel'
import NewUserForm from './NewUserForm'
import ModuleButtons from './ModuleButtons'
import SettingsWindow from './SettingsWindow'
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
        isUser: null,
      },
      show: null,
      notesToDisplay: null,
      date: null,
      isUser: null,
  } 

  componentWillMount() {
    this.getDateFromLocalStorage()
    this.getUserFromLocalStorage()
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.authHandler({ user: user})
        }
      }
    )
    this.getshowFromLocalStorage()
    if (!this.state.notesToDisplay) {
      const notesToDisplay = this.state.notes
      this.setState({ notesToDisplay })
    }
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

  changeNotesToDisplay(options) {
    const notes = {...this.state.notes}
    let notesToDisplay = {}
    for (let property in notes) {
      if (notes.hasOwnProperty(property)) {
        if (notes[property][options.param1] === options.query1 && notes[property][options.param2] === options.query2){
          notesToDisplay[property] = notes[property]
        }
      }
    }
    this.setState({ notesToDisplay })
  }

  getshowFromLocalStorage = () => {
    const show = localStorage.getItem('show')
    if (!show) return
    this.setState({ show })
  }

  getDateFromLocalStorage = () => {
    const date = localStorage.getItem('date')
    if (!date) return
    this.setState({ date })
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

  changeUserInfo(newUserInfo) {
    if (window.confirm('Are you sure you want to change your user information?') === true){
      const userInfo = newUserInfo
      this.setState({ userInfo })
    }
  }

  updateUserFromForm(ev) {
    ev.preventDefault()
    const newForm = ev.target
    const isUser = true
    let userInfo = {...this.state.userInfo}
    userInfo['firstName'] = newForm.firstName.value
    userInfo['lastName'] = newForm.lastName.value
    userInfo['role'] = newForm.role.value
    userInfo['isUser'] = true
    this.setState({ userInfo })
    this.setState({ isUser })
  }

  authHandler = (authData) => {
    let isUser = null
    base.fetch(`personnel/${authData.user.uid}`,{
      context: this,
    }).then(data => {
      if (data.userInfo){
        isUser = true
        this.setState({ isUser })
      } else {
        isUser = false
        this.setState({ isUser })
      }
    })
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


  lineNote(noteObj, personnel) {
    let userID = null
    for (let property in personnel){
      if (personnel.hasOwnProperty(property)) {
        if (personnel[property].userInfo.firstName === noteObj.actor) {
          userID = property
        }
      }
    }
    return{
      id: noteObj.id,
      show: this.state.show,
      actor: noteObj.actor,
      pageNum: noteObj.pageNum,
      issue: noteObj.issue,
      fullLine: noteObj.fullLine,
      actorUserId: userID,
      date: this.state.date,
    }
  }

  addNote = (noteObj, personnel) => {
    const notes = {...this.state.notes}
    const note = this.lineNote(noteObj, personnel)
    notes[note.id] = note
    this.setState({ notes })
    
  }

  removeNote = (note) => {
    if (window.confirm('Are you sure you want to delete this note?') === true) {
      const notes = {...this.state.notes}
      notes[note.id] = null
      this.setState({ notes })
    }
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

  changeDate = (ev) => {
    ev.preventDefault()
    const date = ev.target.rehearseDate.value
    this.setState({ date })
    localStorage.setItem('date', date)
    ev.target.reset()
  }

renderNotes() {
    const actions = {
      saveNote: this.saveNote,
      removeNote: this.removeNote
    }

    return(
      <div>
        {/*<SignOut signOut={this.signOut} />*/}
        <Switch>
          <Route path='/linenotes4' render={() => 
            <div className='lineNotes4Wrapper'>
              <OptionsPanel 
                changeNotesToDisplay={this.changeNotesToDisplay.bind(this)}
                date={this.state.date} 
                changeDate={this.changeDate} 
                notes={this.state.notes} 
                pushToActor={this.pushToActor.bind(this)} 
                changeShow={this.changeShow} 
                currentShow={this.state.show} 
                userType={this.state.userInfo.role} 
                addNote={this.addNote}/>
              <NotesDisplayer
                notes={this.state.userInfo.role === 'Actor' ? this.state.notesToDisplay : this.state.notes}
                {...actions}
              />
            </div>
          } />
          <Route path='/settings' render={() => 
            <SettingsWindow userInfo={this.state.userInfo} changeUserInfo={this.changeUserInfo.bind(this)}/>
          } />
          <Route render={() => 
            <p>Welcome to LineNotes! Please choose a working module from above to get started!</p>  
          } />
        </Switch>
      </div>
    )
  }

  render() {
    let mainContent = null
    if (this.state.uid && this.state.isUser === true){
      mainContent = this.renderNotes()
    } else if (this.state.uid && this.state.isUser === false) {
        mainContent = <NewUserForm formHandler={this.updateUserFromForm.bind(this)} />
    } else {
      mainContent = <h1>Loading, please wait</h1>
    }

    return (
      <div className="App">
        <header className="button-group">
          { this.state.uid ? <ModuleButtons role={this.state.userInfo.role} signOut={this.signOut}/> : <SignIn authHandler={this.authHandler} />}
        </header>
        { this.state.uid ? 
          mainContent :
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