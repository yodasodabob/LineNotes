import React from 'react'
import base from './base'
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

    const makeCastList = (lines) => {
        const castList = {}
        for (let line in lines) {
            if (line != lines.length - 1){
                let splitLine = lines[line].split(":")
                castList[splitLine[0]] = splitLine[1]
            }
        }
        base.post("Shows/SKM/castList", { data: castList })
    }

    const readFile = (ev) => {
        let reader = new FileReader();
        reader.onload = () => {
            let text = reader.result;
            let lines = text.split('\n');
            console.log(lines)
            makeCastList(lines);
        };
        reader.readAsText(ev.target.files[0])
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
            {userInfo.role === "ASM" ? <input type="file" onChange={readFile} accept=".txt, .doc, .rtf, .docx"/> : null}
        </div>
    )
}

export default SettingsWindow