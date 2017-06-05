import React from 'react'

const SignOut = ({ signOut }) => {
  return (
    <button className="SignOut button radius" onClick={signOut}>
      Sign Out
    </button>
  )
}

export default SignOut