import Rebase from 're-base'
import firebase from 'firebase/app'
// eslint-disable-next-line
import database from 'firebase/database'
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
})

const db = firebase.database(app)

export const auth = app.auth()
export const githubProvider = new firebase.auth.GithubAuthProvider()
export const googleProvider = new firebase.auth.GoogleAuthProvider()

const base = Rebase.createClass(db)

export default base
