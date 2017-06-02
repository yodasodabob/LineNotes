import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'

import './App.css';
import base, { auth } from './base'
import LineForm from './LineForm'
// import SignIn from './SignInChoice'
// import { PublicRoute, PrivateRoute } from './RouteHelpers'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uid: null,
      notes: [],
    }
  }

  // componentWillMount() {
  //   this.getUserFromLocalStorage()
  //   base.onAuth((user) => {
  //     if (user) {
  //       this.authHandler(null, { user });
  //     } else {
  //       this.signOut()
  //     }
  //   })
  // }

  // getUserFromLocalStorage = () => {
  //   const uid = localStorage.getItem('uid')
  //   if (!uid) return
  //   this.setState({ uid })
  // }

  // authHandler = (err, authData) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     this.setState({
  //       uid: authData.user.uid,
  //     })
  //     localStorage.setItem('uid', authData.user.id)
  //     this.setupNotes()
  //   }

  //   authed = () => {
  //     return !!this.state.uid
  //   }

  //   signOut = () => {
  //     base.unauth()
  //     this.setState({ uid: null })
  //     localStorage.removeItem('uid')
  //   }

  setUpNotes() {
    this.ref = base.syncState(
      `${this.state.currentPlay}/notes`,
      {
        context: this,
        state: 'actors'
      }
    )
  }

  setCurrentPlay = (showName) => {
    this.currentPlay = showName
  }

  lineNote() {
    return{
      pageNum: 0,
      issue: '',
      fullLine: '',
    }

  }

  render() {
    return (
      <div className="App">
        <LineForm />

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
