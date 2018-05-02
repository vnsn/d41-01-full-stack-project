import React from 'react';

// import { Component } from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from "react-router-dom";

// import Header from "./Header";
import Footer from "./Footer";
import Nav from "./Nav";
import Content from "./Content/Content";

// import getItems from "./redux/item-reducer";

function App() {
    return (
        <div className="wrapper" >
            {/* <Header /> */}
            < Nav />
            <Content />
            <Footer />
        </div>
    )
}


// export default withRouter(connect(null, { getItems })(App));
// export default connect(null, { getItems })(App);
export default App;
