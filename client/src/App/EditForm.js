import React, { Component } from 'react';
import { connect } from "react-redux";
import { editBounty } from "./redux/bounties-redux";

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                firstName: props.firstName || "",
                lastName: props.lastName || "",
                dead: props.dead || false,
                amount: props.amount || 0,
                type: props.type || ""
            }
        }
        this.state = this.initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        const { name, value, type, checked } = event.target;
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: type === "checkbox" ? checked : value
                }
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.editBounty(this.props.id, this.state.inputs);
    }

    render() {
        const { firstName, lastName, dead, amount, type } = this.state.inputs;
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="edit-form">
                    <p><label htmlFor="firstName">Name</label>
                        <input onChange={this.handleChange} name="firstName" value={firstName} type="text" placeholder="First Name" />
                        <input onChange={this.handleChange} name="lastName" value={lastName} type="text" placeholder="Last Name" />
                    </p>
                    <p>
                        <label htmlFor="dead">Dead?
                        <input onChange={this.handleChange} name="dead" id="dead" type="checkbox" checked={dead} /></label>
                    </p>

                    <p>Sith or Jedi?
                        <select onChange={this.handleChange} name="type" id="type" value={type}>
                            <option value="none">Pick a type</option>
                            <option value="sith">Sith</option>
                            <option value="jedi">Jedi</option>
                        </select>
                    </p>

                    <p><label htmlFor="amount">Bounty Amount
                    <input onChange={this.handleChange} name="amount" value={amount} type="number" placeholder="Amount" /></label>
                    </p>

                    <button>Save</button>
                </form>
            </div>
        )
    }
}

export default connect(null, { editBounty })(EditForm)
                // where the null is, is usually mapStateToProps, but since we don't need anything from state, we don't need to pass a function here. 
                // Need to put null as placeholder and cue that 
// connect(function, object)