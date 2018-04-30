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
                type: "",
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
        const { title, author, summary, type } = this.state.inputs;
        return (
            <section className="add-advice">
                <h2>Add your favorite</h2>
                <form onSubmit={this.handleSubmit} className="add-form">

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
            </section>
        )
    }
}

export default connect(null, { addItem })(AddForm);
