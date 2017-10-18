import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.css';
import base, { auth } from './base'
import SignIn from './SignIn'
import NotesDisplayer from './NotesDisplayer'
import OptionsPanel from './OptionsPanel'
import NewUserForm from './NewUserForm'
import ModuleButtons from './ModuleButtons'
import SettingsWindow from './SettingsWindow'
import ScriptReader from './ScriptReader'

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
      dateCheck: false,
  } 

  componentWillMount() { // General
    // Checks for storeed date, user, and show, then sets notes to display equal to all the notes if blank
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

  dateCheck() {
    if (this.state.dateCheck === false && this.state.date ){
      const today = new Date()
      let day = today.getDate().toString()
      let month = (today.getMonth()+1).toString()
      if (day.length === 1) {
          day = "0" + day
      }
      if (month.length === 1) {
          month = "0" + month
      }
      const date_now = today.getFullYear()+'-'+(month)+'-'+day
      console.log(this.state.date, date_now)
      if (this.state.date !== date_now){
        if (window.confirm("Today's date and the stored date do not match.  Do you want to set the date to today or keep it as it is?") == true){
          const date = date_now
          this.setState( { date, dateCheck: true } )
        } else {
          this.setState({ dateCheck: true })
        }
      }
    }
  }

  pushToActor() { // SM, ASM
    // Pushes notes to the relevant actors and then deletes them from the SM's 
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

  getUserFromLocalStorage = () => { // General
    // Retrieves the last logged in user from localstorage; returns blank if none
    const uid = localStorage.getItem('uid')
    if (!uid) return
    this.setState({ uid })
  }

  changeNotesToDisplay(options) { // Actors
    /*
      changes the notes that should be currently displayed
      options should be an object containing the following
        param1: the first thing you want to change (for example show)
        param2: the second thing you want to change (for example date)
        query1: the specific thing you want to display from param1(for example "She kills monsters")
        query2: the specific thing you want to display from param2 (for example "2017-09-30")
    */

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

  getshowFromLocalStorage = () => { // General
    // Retrieves the last saved show from localstorage
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
      scene: noteObj.scene,
      dateEntered:Date(Date.now())
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
      if (this.state.notesToDisplay) {
        const notesToDisplay = {...this.state.notesToDisplay}
        notesToDisplay[note.id] = null
        this.setState({ notes, notesToDisplay })
      } else {
        this.setState({ notes })
      }
    }
  }

  saveNote = (note) => {
    const notes = {...this.state.notes}
    notes[note.id] = note
    this.setState({ notes })
  }

  signOut = () => {
    
    this.setState({ uid: null, notes: {}, role: null, userInfo: {}, show: null, isUser: null, notesToDisplay: {} })
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

  getCurrentInfo(query){
    return(this.state[query])
  }

  

  changeDate = (ev) => {
    // perfCheck = this.state.date ? false : true
    if (ev.preventDefault){
      ev.preventDefault()
    }
    const date = ev.target.rehearseDate.value
    this.setState({ date })
    localStorage.setItem('date', date)
    if (ev.target.reset){
      ev.target.reset()
    }
  }

  fixDates() {
    const notes = {...this.state.notes}
    let numFix = 0
    for(let note in notes) {
      if (notes[note].date != this.state.date){
        numFix += 1
        notes[note].date = this.state.date
      }
    }
    alert(`Number of notes fixed: ${numFix}`)
    this.setState({ notes })
  }

  renderNotes() {
    const actions = {
      saveNote: this.saveNote,
      removeNote: this.removeNote,
      role: this.state.userInfo.role,
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
          <Route path='/linenotes3js' render={() => 
            <ScriptReader fixDates={this.fixDates.bind(this)} changeDate={this.changeDate} addNote={this.addNote} getCurrentInfo={this.getCurrentInfo.bind(this)} />
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
      </div>
    );
  }
}

export default App;