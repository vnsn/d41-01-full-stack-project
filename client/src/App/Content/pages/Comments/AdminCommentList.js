import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editItem, deleteComment } from '../../../redux/item-reducer';
import CommentEdit from './CommentEdit';
// import CommentForm from './CommentForm';

class AdminCommentList extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(itemObj, id, delIndex) {
        let newCommentsArr = itemObj.comments.filter((comment, index) => delIndex !== index);
        let editedItem = { ...itemObj, comments: newCommentsArr };
        this.props.editItem(editedItem, id);
    }

    render() {
        const textList = this.props.comments.map((comment, index) => {
            return (
                <div className="comment" key={comment + index}>

                    <button onClick={() => this.handleDelete(this.props, this.props._id, index)} className="del-button"><i className="fas fa-trash-alt fa-2x fa-fw"></i></button>

                    <CommentEdit itemObj={this.props} editingIndex={index} editingText={comment} />

                </div>
            );
        })

        return (
            <div className="comment-container">
                <h3>Comments</h3>

                {/* <CommentForm {...this.props} /> */}

                {textList}

            </div>
        )
    }

}

export default connect(null, { editItem, deleteComment })(AdminCommentList);
