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
                refUrl: props.refUrl || "",
                imgUrl: props.imgUrl || "",
                flagged: props.flagged || false,
                votes: props.votes || 0,
                sharer: props.sharer || "",
                category: props.category || ""
                // comments: props.comments || []
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
        const inputs = {...this.state.inputs};
        if(inputs.category === "") {
            delete inputs.category;
        }
        
        this.props.submit(inputs, ...this.props.args)
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

        const { author, summary, type, refUrl, imgUrl, category, sharer } = this.state.inputs;

        return (
            <form onSubmit={this.handleSubmit} className="item-form">
                <p>
                    <label htmlFor="type">Best Advice or Worst? <span className="required">*</span></label>
                    <select onChange={this.handleChange} name="type" id="type" value={type}>
                        <option value="none">Pick one</option>
                        <option value="best">Best</option>
                        <option value="worst">Worst</option>
                    </select>
                </p>

                <p>
                    <label htmlFor="category">Category:</label>
                    <select onChange={this.handleChange} name="category" id="category" value={category}>
                        <option value="none">Pick one</option>
                        <option value="Leading">Leading</option>
                        <option value="Parents">Parents</option>
                        <option value="Process">Process</option>
                        <option default value="Life">Life</option>
                    </select>
                </p>

                <p>
                    <label htmlFor="summary">Advice <span className="required">*</span></label>
                    <textarea onChange={this.handleChange} name="summary" id="summary" value={summary} placeholder="What's the advice?" />
                </p>
                <p>
                    <label htmlFor="author">From <span className="required">*</span></label>
                    <input onChange={this.handleChange} name="author" id="author" value={author} type="text" placeholder="Who gave it?" />
                </p>

                <p>
                    <label htmlFor="sharer">Your Name</label>
                    <input onChange={this.handleChange} name="sharer" id="sharer" value={sharer} type="text" placeholder="Your name (optional)" />
                </p>

                <p>
                    <label htmlFor="refUrl">Website</label>
                    <input onChange={this.handleChange} name="refUrl" id="refUrl" value={refUrl} type="text" placeholder="Website (optional)" />
                </p>

                <p>
                    <label htmlFor="imgUrl">Image Link</label>
                    <input onChange={this.handleChange} name="imgUrl" id="imgUrl" value={imgUrl} type="text" placeholder="Link to image related to the advice (optional)" />
                </p>
                <p className="required">* Fields marked with an asterisk are required.</p>
                <button>Submit</button>
            </form>
        )
    }
}

export default connect(null, null)(Form)
