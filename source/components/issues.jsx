import React from "react";
import View from "./_view.jsx";
import Horizon from "./horizon.jsx";
import { Grid } from "react-bootstrap";

import IssueActions from "../actions/issue-actions";
import IssueStore from "../stores/issue-store";
import IssueDetails from "../components/issue-details.jsx";

import connectToStores from "alt-utils/lib/connectToStores";

class Issues extends View {
  constructor(props) {
    super(props);

    this.bindFuncs("loadNextPage");
  }

  static getStores() {
    return [IssueStore];
  }

  static getPropsFromStores() {
    return IssueStore.getState();
  }

  render() {
    let issues = [].concat.apply([], this.props.issuePages);

    return (
      <Horizon fetcher={this.loadNextPage} fetchDepth={1000}>
        <Grid>
          { issues.map(issue => <IssueDetails issueObject={issue} />) }
        </Grid>
      </Horizon>
    );
  }

  loadNextPage(page, done) {
    IssueActions.fetchIssuePage({ page }, done);
  }
}

export default connectToStores(Issues);
