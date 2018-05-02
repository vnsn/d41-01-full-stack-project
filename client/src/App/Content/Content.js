import React from 'react';

import { Switch, Route, withRouter } from "react-router-dom";

import List from "./pages/List";
import About from "./pages/About";
import AddAdvice from "./pages/AddAdvice";
import Admin from "../Admin";
import OneAdvice from "../Content/pages/OneAdvice";

function Content(props) {
    return (
        <main className={ props.location.pathname === "/" ? "content-list" : ""} >
            <Switch>
                <Route exact path="/" component={List} />
                <Route path="/about" component={About} />
                <Route path="/add" component={AddAdvice} />
                <Route path="/4lSSxy30l43jsTtlcVvWtCEKILUE9UZIvKB3AAIGnjFK2LQ9w0" component={Admin} />
                <Route path="/items/:id" component={OneAdvice} />
            </Switch>
        </main>
    );
}

export default withRouter(Content);
