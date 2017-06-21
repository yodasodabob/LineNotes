import React, { Component } from 'react'

class NewUserForm extends Component {

    render() {
        return(
            <div>
                <h2>You are a new user; please fill out this form </h2>
                <form onSubmit={this.props.formHandler}>
                    <input type="text" name='firstName' />
                    <input type="text" name='lastName' />
                    <input type="text" name='role' />
                    <button type='submit' className='button success radius'>Submit</button>
                </form>
            </div>
        )
    }
}

export default NewUserForm