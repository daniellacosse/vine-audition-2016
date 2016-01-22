import Alt from "alt";
import React from "react";
import { render } from "react-dom";

import _i from "./components/_index";

import { Router, Route, browserHistory } from "react-router";
import { Grid, Row } from "react-bootstrap";

class Index extends _i.View {
  render() {
    return (
      <Grid>
        <Row>
          <h1>HELLO-WELCOME TO ALT-SLUG</h1>
        </Row>
        {this.props.children}
      </Grid>
    );
  }
}

render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={Index} />
    </Router>
  ),
  document.getElementById("react-container")
);

export default new Alt();
