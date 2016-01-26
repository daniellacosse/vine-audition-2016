import React from "react";
import { Router, Route, browserHistory, IndexRoute } from "react-router";

import _i from "./components/_index";
import { render } from "react-dom";

class Index extends _i.View {
  render() {
    return (
      <section>
        <h1>AN ISSUE TRACKER FOR NPM</h1>
        {this.props.children}
      </section>
    );
  }
}

render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={Index}>
        <IndexRoute component={_i.Issues} />
      </Route>

      <Route path="/forbidden" component={_i.Forbidden} />
      <Route path="*" component={_i.NotFound} />
    </Router>
  ),
  document.getElementById("react-container")
);
