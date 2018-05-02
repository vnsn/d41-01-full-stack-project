import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getItems, deleteItem, editItem } from "../../redux/item-reducer";

import CommentList from './Comments/CommentList';

class List extends Component {
    constructor() {
        super()
        this.style = {
            red: {
                backgroundColor: "#990000",
                borderColor: "#990000",
            },
            gray: {
                backgroundColor: "#212529",
                opacity: 0.7,
                borderColor: "#212529",
                boxShadow: "10px 10px 5px black"
                // boxShadow: "10px 10px 5px #212529"
            }
        }
    }
    componentDidMount() {
        this.props.getItems();
    }

    render() {
        const { data, loading, errMsg } = this.props;
        const itemList = data.sort((a, b) => {
            const aDate = new Date(a.createdAt).getTime();
            const bDate = new Date(b.createdAt).getTime();
            return bDate - aDate;
        }).sort((a, b) => b.votes - a.votes).map(item => {
        
        const shareBlock = () => {
            if (item.sharer.length > 0 && item.refUrl.length > 0) {
                return <p className="item-sharer">Shared by: <a href={item.refUrl}>{item.sharer}</a></p>
            } else if (item.sharer.length > 0) {
                return <p className="item-sharer">Shared by: {item.sharer}</p>
            } else if (item.refUrl.length > 0) {
                return <p className="item-sharer">Shared by: <a href={item.refUrl}>Anonymous</a></p>
            } else {
                return
            }
        }
        return (
            <div className="issue" key={item._id} style={(item.type === "best") ? this.style.red : this.style.gray}>
                <div className="janky">
                    <h3 className="item-category">{item.category}</h3>
                    <p className="item-summary">"{item.summary}"</p>
                    <p className="item-author"> ~ {item.author} </p>

                    {shareBlock()}

                    <p><Link to={"/items/" + item._id}>{new Date(item.createdAt).toLocaleDateString()}</Link>
                    </p>
                </div>

                <CommentList {...item} />
            </div>
        );
    });

    if(loading) {
        return <p>Loading... please wait.</p>
    } else if(errMsg) {
        return <p>Data details no workie workie</p>
    } else {
    return (
        <div className="list">
            <h2>The Best (or Worst) Advice I Ever Got...</h2>
            <div className="issue-container">
                {itemList}
            </div>
        </div>
    )
}
    }
}

export default connect(state => state.items, { getItems, deleteItem, editItem })(List);
