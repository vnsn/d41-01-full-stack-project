import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editItem } from './redux/item-reducer';

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
        this.props.editItem(this.state.inputs, this.props._id);
    }

    render() {
        {this.props.redirect && this.state.fireRedirect && (<Redirect to={this.props.path} />)}

        console.log(this.props);
        const { title, author, summary, type } = this.state.inputs;
        return (

            <form onSubmit={this.handleSubmit} className="edit-form">

                <p>Best Advice or Worst?
    <select onChange={this.handleChange} name="type" id="type" value={type}>
                        <option value="none">Pick one</option>
                        <option value="best">Best</option>
                        <option value="worse">Worst</option>
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

export default connect(null, { editItem })(Form)
                // where the null is, is usually mapStateToProps, but since we don't need anything from state, we don't need to pass a function here. 
                // Need to put null as placeholder and cue that 
// connect(function, object)