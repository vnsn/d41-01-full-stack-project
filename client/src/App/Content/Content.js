import React from 'react';

import { Switch, Route, withRouter } from "react-router-dom";

import List from "./pages/List";
import About from "./pages/About";
import AddAdvice from "./pages/AddAdvice";
import Admin from "../Admin";

function Content(props) {
    return (
        <main className={ props.location.pathname === "/" ? "content-list" : ""} >
            <Switch>
                <Route exact path="/" component={List} />
                <Route path="/about" component={About} />
                <Route path="/add" component={AddAdvice} />
                <Route path="/admin" component={Admin} />
                {/* <Route path="/movie/:id/:title/:release_date" component={Game} /> */}
            </Switch>
        </main>
    );
}

export default withRouter(Content);
