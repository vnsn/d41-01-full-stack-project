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
                        <button onClick={() => this.handleVote(item._id, item, 1)} value="1" className="up-button">UP</button>

                        {item.votes}

                        <button onClick={() => this.handleVote(item._id, item, -1)} value="-1" className="dn-button">DN</button>

                    </div>

                    <h2 className="issue-name">{item.title}</h2>

                    <button onClick={() => this.props.deleteItem(item._id)} className="del-button">DEL</button>
                    
                    <p className="item-summary">{item.summary}</p>

                    <AdminCommentList {...item} />

                </div>
            );
        })

        return (
            <div className="issue-container">
                <h2>ADMIN USE ONLY</h2>
                {itemList}
            </div>
        )
    }
}

export default connect(state => state.items, { getItems, deleteItem, editItem })(Admin);
