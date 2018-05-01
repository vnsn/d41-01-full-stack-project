import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editItem, deleteComment } from '../../../redux/item-reducer';
import CommentForm from './CommentForm';

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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

    handleSubmitComment(id, itemObj, commentText) {
        itemObj.comments.push(commentText);
        this.props.editItem(id, itemObj);
    }

    handleDelete(id, itemObj, delIndex) {
        let newCommentsArr = itemObj.comments.filter((comment, index) => delIndex !== index);
        let editedItem = { ...itemObj, comments: newCommentsArr };
        this.props.editItem(id, editedItem);
    }

    render() {
        const textList = this.props.comments.map((comment, index) => {
            return (
                <li key={comment + index}>{comment} </li>
            );
        })

        return (
            <div className="comment-container">
                <h3>Comments</h3>

                <ul className="comment-list">
                    {textList}
                </ul>

                <CommentForm {...this.props} />

            </div>
        )
    }

}

export default connect(null, { editItem, deleteComment })(CommentList);
