import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Form extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                author: props.author || "",
                title: props.title || "",
                summary: props.summary || "",
                type: props.type || "",
                votes: props.votes || 0
            },
            readyToRedirect: false,
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
        this.props.submit(this.state.inputs, ...this.props.args)
        this.setState(prevState => {
            return {
                readyToRedirect: true,
            }
        });
    }

    render() {
        if (this.props.redirect && this.state.readyToRedirect) {
            return <Redirect to={this.props.path} />
        }

        const { author, summary, type } = this.state.inputs;

        return (
            <form onSubmit={this.handleSubmit} className="item-form">

                <p>Best Advice or Worst?
                    <select onChange={this.handleChange} name="type" id="type" value={type}>
                        <option value="none">Pick one</option>
                        <option value="best">Best</option>
                        <option value="worst">Worst</option>
                    </select>
                </p>
                <p>
                    <label htmlFor="summary">Advice</label>
                    <textarea onChange={this.handleChange} name="summary" id="summary" value={summary} placeholder="What's the advice?" />
                </p>
                <p>
                    <label htmlFor="author">From</label>
                    <input onChange={this.handleChange} name="author" id="author" value={author} type="text" placeholder="Who gave it?" />
                </p>

                <button>Submit</button>
            </form>
        )
    }
}

export default connect(null, null)(Form)
