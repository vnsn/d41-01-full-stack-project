import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editItem } from '../../../redux/item-reducer';

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                newComment: "",
            }
        }
        this.state = this.initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
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

    handleSubmitComment(id, itemObj, newComment) {

        itemObj.comments.push(newComment);
        this.props.editItem(id, itemObj);
    }

    render() {
        const { newComment } = this.state.inputs;
        return (
            <form onSubmit={() => this.handleSubmitComment(this.props._id, this.props, newComment)} className="comment-form">
                <input onChange={this.handleChange} name="newComment" value={newComment} placeholder="Add your comment - be nice" />

                <button>Submit</button>
            </form>
        )
    }
}

export default connect(null, { editItem })(CommentForm);
