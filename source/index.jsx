import React from "react";
import { Router, Route, browserHistory } from "react-router";

import _i from "./components/_index";
import { render } from "react-dom";

render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={_i.Issues}>
      </Route>
    </Router>
  ),
  document.getElementById("react-container")
);
