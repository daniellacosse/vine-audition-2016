import React from "react";
import View from "./_view.jsx";
import { Grid } from "react-bootstrap";
import Horizon from "./horizon.jsx";

import IssueActions from "../actions/issue-actions";
import IssueStore from "../stores/issue-store";
import IssueDetails from "../components/issue-details.jsx";

import connectToStores from "alt-utils/lib/connectToStores";

const PAGE_PREFIX = "page";

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
    return (
      <Horizon fetcher={this.loadNextPage} fetchDepth={1000} prefix={PAGE_PREFIX}>
        {this.props.issuePages.map((page, i) => {
          return (
            <Grid id={`${PAGE_PREFIX}-${i}`} key={i}>
              { page.map((issue, j) => <IssueDetails issueData={issue} key={j} />) }
            </Grid>
          );
        })}
      </Horizon>
    );
  }

  loadNextPage(page, done) {
    IssueActions.fetchIssuePage({ page }, done);
  }
}

export default connectToStores(Issues);
