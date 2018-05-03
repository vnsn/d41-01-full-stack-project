import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editItem, deleteComment } from '../../../redux/item-reducer';
import CommentForm from './CommentForm';

class CommentList extends Component {

    render() {
        const textList = this.props.comments.map((comment, index) => {
            return (
                <li key={comment + index}>{comment} </li>
            );
        })

        return (
            <div className="comment-container">
                <h3>Comments</h3>
                <ul className="comment-list">{textList}</ul>
                <CommentForm {...this.props} />
            </div>
        )
    }
}

export default connect(null, { editItem, deleteComment })(CommentList);
