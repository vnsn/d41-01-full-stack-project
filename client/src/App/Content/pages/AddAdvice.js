import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../redux/item-reducer';
import Form from '../../Form';
// import { Redirect } from 'react-router';
// import { withRouter } from "react-redux"

class AddAdvice extends Component {

    render() {

        return (
            <section className="add-advice">
                <h2>Add your favorite</h2>

                <Form submit={this.props.addItem} args={[]} redirect path="/" />

            </section>
        )
    }
}

export default connect(null, { addItem })(AddAdvice);
