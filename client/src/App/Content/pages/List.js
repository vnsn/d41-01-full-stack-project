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
            return (
                <div className="issue" key={item._id} style={ (item.type === "best") ? this.style.red : this.style.gray}>
                    {/* <div className="votes">
                        <button onClick={() => this.handleVote(item._id, item, 1)} value="1" className="up-button"><i class="fas fa-caret-up fa-fw fa-2x"></i></button>

                        <p>
                            {item.votes}
                        </p>

                        <button onClick={() => this.handleVote(item._id, item, -1)} value="-1" className="dn-button"><i class="fas fa-caret-down fa-2x fa-fw"></i></button>
                    </div> */}

                    {/* <button onClick={() => this.props.deleteItem(item._id)} className="del-button">DEL</button> */}

                    <h3 className="item-summary">"{item.summary}"</h3>
                    <p className="item-author"> ~ {item.author}</p>

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
