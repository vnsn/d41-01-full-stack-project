import React, { Component } from 'react';
import { connect } from "react-redux";
import { getItems, deleteItem, editItem } from "../../redux/item-reducer";

import CommentList from './Comments/CommentList';

class List extends Component {
    constructor() {
        super()
        this.style = {
            red: {
                backgroundColor: "#990000",
                borderColor: "#990000"
            },
            gray: {
                backgroundColor: "#212529",
                opacity: 0.7,
                borderColor: "#212529"
            }
        }
    }
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
            console.log(item);
            return (
                <div className="issue" key={item._id} style={(item.type === "best") ? this.style.red : this.style.gray}>
                    <div className="janky">
                        <p className="item-category">{item.category}</p>
                        <p className="item-summary">"{item.summary}"</p>
                        <p className="item-author"> ~ {item.author} </p>
                        <p className="item-sharer">Shared by: <a href={item.refUrl}>{item.sharer}</a></p>
                        {/* <p className="item-image">{item.imgUrl}</p> */}
                        {/* <p>{new Date(item.createdAt).toLocaleDateString()}</p> */}
                    </div>

                    <CommentList {...item} />
                </div>
            );
        });


        return (
            <div className="list">
                <h2>The Best Advice I Ever Got...</h2>
                <div className="issue-container">
                    {itemList}
                </div>
            </div>
        )
    }
}

export default connect(state => state.items, { getItems, deleteItem, editItem })(List);
