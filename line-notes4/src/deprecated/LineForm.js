import React, { Component } from 'react'
import './LineForm.css'

class LineForm extends Component {
    render() {
        return(
            <div className="medium-offset-2 medium-8">
                <form id="new-note">
                    <div className="row">
                        <div className="medium-2 column">
                            <label>Actor name
                            <input
                                className="input-group-field"
                                type="text"
                                name="actorName"
                                placeholder="Enter actor name"
                                autoFocus
                                required
                            />
                            </label>
                        </div>
                        <div className="medium-2 column">
                            <label>Page number
                            <input
                                className="input-group-field"
                                type="text"
                                name="pageNum"
                                placeholder="Enter page number"
                                required
                            />
                            </label>
                        </div>
                        <div className="medium-2 column">
                            <label>Issue
                            <input
                                className="input-group-field"
                                type="text"
                                name="issue"
                                placeholder="Enter issue"
                                required
                            />
                            </label>
                        </div>
                        <div className="medium-2 column">
                            <label>Full line
                            <input
                                className="input-group-field"
                                type="text"
                                name="fullLine"
                                placeholder="Enter full line"
                                required
                            />
                            </label>
                        </div>
                    </div>
                    <div className="input-group-button medium-offset-2 medium-2">   
                        <button type="submit" className="success button">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default LineForm