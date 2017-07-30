import Rebase from 're-base'
import firebase from 'firebase/app'
import database from 'firebase/database'
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyDlL71CbQmesF09lfcYyj21EwSiIOuD4pc",
    authDomain: "linenotes4.firebaseapp.com",
    databaseURL: "https://linenotes4.firebaseio.com",
    projectId: "linenotes4",
    storageBucket: "linenotes4.appspot.com",
    messagingSenderId: "706254834104"
})

const db = firebase.database(app)

export const auth = app.auth()
export const githubProvider = new firebase.auth.GithubAuthProvider()
export const googleProvider = new firebase.auth.GoogleAuthProvider()

const base = Rebase.createClass(db)

export default base
