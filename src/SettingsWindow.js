import React from 'react'
import './SettingsWindow.css'

const SettingsWindow = (props) => {
    const userInfo = props.userInfo

    const submitHandler = (ev) => {
        ev.preventDefault()
        const form = ev.target
        if (form.newFirstName.value) {
            userInfo['firstName'] = form.newFirstName.value
        }
        if (form.newLastName.value) {
           userInfo['lastName'] = form.newLastName.value
        }
        if (form.newRole.value) {
            userInfo['role'] = form.newRole.value
        }
        form.reset()
        props.changeUserInfo(userInfo)
    }

    return(
        <div>
            <p className="instructions">Enter new user information into the text boxes to change account information</p>
            <form className="changeUserInfoForm" onSubmit={submitHandler}>
                <label htmlFor="newFirstName">First name; current: {userInfo.firstName}</label>
                <input type="text" name='newFirstName' id='newFirstName' />
                <label htmlFor="newLastName">Last name; current: {userInfo.lastName}</label>
                <input type="text" name='newLastName' id='newLastName' />
                {/* <label>
                    Main production; current: {userInfo.show}
                    <input type="text" name='newShow' id='newShow'/>
                </label> */}
                <label htmlFor='newRole'>Role in production; current: {userInfo.role}</label>
                <input type="text" name='newRole' id='newRole' />
                <button type='submit' className='button success'>Submit</button>
            </form>
        </div>
    )
}

export default SettingsWindow