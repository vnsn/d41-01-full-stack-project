import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems, deleteItem, editItem } from './redux/item-reducer';

import AdminCommentList from './Content/pages/Comments/AdminCommentList';

class Admin extends Component {
    componentDidMount() {
        this.props.getItems();
    }

    handleVote = (id, itemObj, voteNum) => {
        itemObj.votes += voteNum;
        this.props.editItem(id, itemObj);
    }

    render() {
        const { data } = this.props;

        const itemList = data.sort((a, b) => b.votes - a.votes).map(item => {
            return (
                <div className="admin-issue" key={item._id}>

                    <div className="votes">
                        <button onClick={() => this.handleVote(item._id, item, 1)} value="1" className="up-button"><i class="fas fa-caret-up fa-fw fa-2x"></i></button>

                        <p>
                            {item.votes}
                        </p>

                        <button onClick={() => this.handleVote(item._id, item, -1)} value="-1" className="dn-button"><i class="fas fa-caret-down fa-2x fa-fw"></i></button>
                    </div>

                    <button onClick={() => this.props.deleteItem(item._id)} className="del-button"><i class="fas fa-trash-alt fa-2x fa-fw"></i></button>

                    <h2 className="item-name">{item.title}</h2>

                    <p className="item-summary">{item.summary}</p>
                    <p className="item-author"> ~ {item.author}</p>

                    <AdminCommentList {...item} />

                </div>
            );
        })

        return (
            <div className="admin">
            <h2>ADMIN USE ONLY</h2>
                <div className="admin-issue-container">
                    {itemList}
                </div>
            </div>
        )
    }
}

export default connect(state => state.items, { getItems, deleteItem, editItem })(Admin);
