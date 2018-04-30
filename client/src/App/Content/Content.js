import React from 'react';

import { Switch, Route } from "react-router-dom";

import List from "./pages/List";
import About from "./pages/About";
import AddForm from "./pages/AddForm";
import Admin from "../Admin";

function Content(props) {
    return (
        <main>
            <Switch>
                <Route exact path="/" component={List} />
                <Route path="/about" component={About} />
                <Route path="/add" component={AddForm} />
                <Route path="/admin" component={Admin} />
                {/* <Route path="/movie/:id/:title/:release_date" component={Game} /> */}
            </Switch>
        </main>
    );
}

export default Content;
