import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../redux/item-reducer';


class AddForm extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                author: "",
                title: "",
                summary: "",
                votes: 0
            }
        }
        this.state = this.initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: value
                }
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.addItem(this.state.inputs);
        this.setState(this.initialState);
    }

    render() {
        const { author, summary } = this.state.inputs;
        return (
            <section className="add-advice">
            <h2>Add your favorite advice</h2>
                <form onSubmit={this.handleSubmit} className="add-form">
                    <p>
                        <label htmlFor="author">Author</label>
                        <input onChange={this.handleChange} name="author" id="author" value={author} type="text" />
                    </p>
                    <p>
                        <label htmlFor="summary">Advice</label>
                        <textarea onChange={this.handleChange} name="summary" id="summary" value={summary} />
                    </p>
                    <button>Post</button>
                </form>
            </section>
        )
    }
}

export default connect(null, { addItem })(AddForm);
