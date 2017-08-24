import React from 'react'

import { auth, githubProvider,googleProvider } from './base'
import './SignIn.css'

const SignIn = ({ authHandler }) => {
    const authenticate = (provider) => {
        auth
            .signInWithPopup(provider)
            .then(authHandler)
            .catch(error => {
                alert(`Sign-in error: ${error.name}: ${error.message}`)
            })
    }

    return(
        <div className="signInChoice">
            <button
                className="SignIn button Default"
                onClick={() => authenticate(googleProvider)}
            >
                Sign in with Google
            </button>
        </div>
    )
}

export default SignIn