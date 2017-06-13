import React from 'react'

import { auth, githubProvider } from './base'
import './SignIn.css'

const SignIn = ({ authHandler }) => {
    const authenticate = (provider) => {
        auth
            .signInWithPopup(provider)
            .then(authHandler)
    }

    return(
        <div className="signInChoice">
            <button
                className="SignIn button default"
                onClick={() => authenticate(githubProvider)}
            >
                Sign in with GitHub
            </button>
        </div>
    )
}

export default SignIn