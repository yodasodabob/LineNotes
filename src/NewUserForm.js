import React, { Component } from 'react'
import './NewUserForm.css'

class NewUserForm extends Component {

    render() {
        return(
            <div className="newUserForm">
                <h2>You are a new user; please fill out this form </h2>
                <form onSubmit={this.props.formHandler}>
                    <input type="text" name='firstName' placeholder='First name' className='formField' />
                    <input type="text" name='lastName' placeholder='Last name' className='formField' />
                    <select name='role'>
                        <option value="Actor">Actor</option>
                        <option value="ASM">Assistant Stage Manager</option>
                        <option value="SM">Stage Manager</option>
                        <option value="PA">Production Assistant</option>
                    </select>
                    <input type="text" name='role' placeholder='Role in Production (Actor, ASM, etc)' className='formField' />
                    <button type='submit' className='button success extended'>Submit</button>
                </form>
            </div>
        )
    }
}

export default NewUserForm