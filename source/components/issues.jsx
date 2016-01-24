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
  }

  static getStores() {
    return [IssueStore];
  }

  static getPropsFromStores() {
    return IssueStore.getState();
  }

  render() {
    let { clientHeight } = document.body;
    let containerHeight = (clientHeight <= 1000) ? 1000 : clientHeight;

    return (
      <Infinite
        className="issues montserrat"
        elementHeight={100}
        infiniteLoadBeginEdgeOffset={1000}
        isInfiniteLoading={this.state.isInfiniteLoading}
        timeScrollStateLastsForAfterUserScrolls={1000}
        containerHeight={containerHeight}
        onInfiniteLoad={this.loadNextPage}
        useWindowAsScrollContainer
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
    this.setState({ isInfiniteLoading: true });

    IssueActions
      .fetchIssuePage(
        { page: this.props.issuePages.length + 1 },
        () => this.setState({ isInfiniteLoading: false })
      );
  }
}

export default connectToStores(Issues);
