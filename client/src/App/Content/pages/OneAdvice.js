import React, { Component } from 'react';
import { connect } from "react-redux";
import { getOneItem } from "../../redux/item-reducer";

import CommentList from './Comments/CommentList';

class OneAdvice extends Component {
    constructor(props) {
        super(props)
        this.style = {
            red: {
                backgroundColor: "#990000",
                borderColor: "#990000",
                boxShadow: "10px 10px 5px #212529"
            },
            gray: {
                backgroundColor: "#212529",
                opacity: 0.9,
                borderColor: "#212529",
                boxShadow: "10px 10px 5px black"
            }
        }
        // this.state = {
        //     loading: true,
        //     errMsg: "",
        //     item: {}
        // }
    }

    componentDidMount() {
        // could do the axios.get RIGHT HERE
        // in a function that I write and bind to "this"
        // then set state to the returned object

        this.props.getOneItem(this.props.match.params.id);
    }

    render() {
        const { currentLoading, errMsg } = this.props;
        const item = this.props.currentOne;

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


        if (currentLoading) {
            return <p>Loading... please wait.</p>
        } else if (errMsg) {
            return <p>Data details no workie workie</p>
        } else {
            return (
                <div className="list">
                    {/* NAME THIS ONEITEM OR SOMETHING SO I CAN MAKE EVERYTHING BIGGER BECAUSE IT'S THE ONLY ONE. */}

                    <h2>The Best (or Worst) Advice I Ever Got...</h2>
                    <div className="issue-container">
                        <div className="issue single" key={item._id} style={(item.type === "best") ? this.style.red : this.style.gray}>
                            <div className="janky">
                                <h3 className="item-category">{item.category}</h3>
                                <p className="item-summary">"{item.summary}"</p>
                                <p className="item-author"> ~ {item.author} </p>

                                {shareBlock()}

                                <p>{new Date(item.createdAt).toLocaleDateString()}
                                </p>

                                {item.imgUrl && <img className="item-image" src={item.imgUrl} alt="shared by the person who posted the advice" />}

                            </div>
                            <CommentList {...item} />
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default connect(state => state.items, { getOneItem })(OneAdvice);
