import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems, deleteItem, editItem } from './redux/item-reducer';

import AdminCommentList from './Content/pages/Comments/AdminCommentList';

import Form from './Form';


class Admin extends Component {
    constructor(props) {
        super(props);
        this.handleVote = this.handleVote.bind(this);
    }

    componentDidMount() {
        this.props.getItems();
    }

    handleVote = (itemObj, id, voteNum) => {
        itemObj.votes += voteNum;
        this.props.editItem(itemObj, id);
    }

    render() {
        const { data } = this.props;

        const itemList = data.sort((a, b) => {
            const aDate = new Date(a.createdAt).getTime();
            const bDate = new Date(b.createdAt).getTime();
            return b.votes - a.votes || bDate - aDate;
        }).map(item => {
            return (
                <div className="admin-issue" key={item._id}>

                    <div className="votes">
                        <button onClick={() => this.handleVote(item, item._id, 1)} value="1" className="up-button"><i className="fas fa-caret-up fa-fw fa-2x"></i></button>

                        <p>
                            {item.votes}
                        </p>

                        <button onClick={() => this.handleVote(item, item._id, -1)} value="-1" className="dn-button"><i className="fas fa-caret-down fa-2x fa-fw"></i></button>
                    </div>

                    <button onClick={() => this.props.deleteItem(item._id)} className="del-button"><i className="fas fa-trash-alt fa-2x fa-fw"></i></button>

                    <Form submit={this.props.editItem} {...item} args={[item._id]} />
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
