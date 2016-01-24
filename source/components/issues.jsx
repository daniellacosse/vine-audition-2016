import React from "react";
import View from "./_view.jsx";
import Infinite from "react-infinite";
import { Grid } from "react-bootstrap";

import IssueActions from "../actions/issue-actions";
import IssueStore from "../stores/issue-store";
import IssueDetails from "../components/issue-details.jsx";

import connectToStores from "alt-utils/lib/connectToStores";

class Issues extends View {
  constructor(props) {
    super(props);

    this.bindFuncs("loadNextPage");

    IssueActions.fetchIssuePage();
  }

  static getStores() {
    return [IssueStore];
  }

  static getPropsFromStores() {
    return IssueStore.getState();
  }

  render() {
    return (
      <Infinite
        elementHeight={100}
        containerHeight={window.innerHeight}
        useWindowAsScrollContainer
        infiniteLoadBeginEdgeOffset={200}
        onInfiniteLoad={this.loadNextPage}
        {...this.props}
      >
        {this.props.issuePages.map((issues) => {
          return (
            <Grid>
              { issues.map(issue => <IssueDetails issueObject={issue} />) }
            </Grid>
          );
        })}
      </Infinite>
    );
  }

  loadNextPage() {
    IssueActions.fetchIssuePage({ page: this.props.issuePages.length + 1 });
  }
}

export default connectToStores(Issues);
