import React from "react";
import View from "./_view.jsx";
import ReactDOM from "react-dom";
import { Grid } from "react-bootstrap";

import HorizonLoader from "./horizon-loader.jsx";

import mixin from "react-mixin";
import { OnScroll } from "react-window-mixins";

// TODO: fine for now but should be re-thought a little bit in the
// general case (ES7? more options? loader and pagers are seperate components?)
class Horizon extends View {
  constructor(props) {
    super(props);

    this.bindFuncs(
      "fetchChildren",
      "jumpToPreviousPage",
      "jumpToPage",
      "jumpToTop",
      "nearestPreviousPage",
      "onScroll"
    );

    this.state.fetchCall = 0;
  }

  render() {
    let {fetching, canJumpToTop, canJumpToPage} = this.state;
    let loader, jumpUp;

    if (canJumpToTop) jumpUp = "jump-to-top";
    if (canJumpToPage) jumpUp = "jump-to-page";

    if (fetching) {
      loader = (
        <div className="loading-container">
          <HorizonLoader className="fetch-icon" />
        </div>
      );
    }

    return (
      <section id="horizon">
        {loader}
        {this.props.children}
        <div className={`jumping-container ${jumpUp}`}>
          <div className="jumper home-icon" onClick={this.jumpToTop} />
          <div
            className="jumper page-up-icon"
            onClick={this.jumpToPreviousPage}
          />
        </div>
      </section>
    );
  }

  fetchChildren() {
    let callNumber, {fetching, fetchCall} = this.state;

    if (fetching) return;
    else callNumber = this.state.fetchCall + 1;

    this.setState({
      fetching: true, fetchCall: callNumber
    });

    this.props.fetcher(callNumber, () => {
      this.setState({ fetching: false });
    });
  }

  onScroll() {
    clearTimeout(this.state.timeout);

    let canJumpToTop, canJumpToPage, timeout;

    let { fetchDepth, children } = this.props;
    let { clientHeight, offsetTop } = this.getDOMNode();

    let scrollPosition = window.pageYOffset - offsetTop;
    let scrollDepth = clientHeight - scrollPosition;

    if (scrollPosition > window.innerHeight) canJumpToTop = true;

    if (
      children.length > 1 &&
      scrollPosition > document.getElementById(children[1].props.id).offsetTop
    ) canJumpToPage = true;

    if ((scrollDepth < fetchDepth) || (clientHeight < fetchDepth))
      timeout = setTimeout(this.fetchChildren, 250);

    this.setState({ scrollPosition, canJumpToTop, canJumpToPage, timeout });
  }

  jumpToTop() {
    scroll(0, 0);
    this.setState({ scrollPosition: 0 });
  }

  jumpToPage(pageID) {
    document.getElementById(pageID).scrollIntoView();

    this.setState({
      scrollPosition: window.pageYOffset - this.getDOMNode().offsetTop
    });
  }

  nearestPreviousPage() {
    let nearestPreviousPageID;

    this.props.children.forEach((el, i) => {
      let offset = document.getElementById(el.props.id).offsetTop;

      if (offset > this.state.scrollPosition) return;
      else nearestPreviousPageID = i;
    });

    if (nearestPreviousPageID === 0) return 0;
    else return nearestPreviousPageID;
  }

  jumpToPreviousPage() {
    this.jumpToPage(`${this.props.prefix}-${this.nearestPreviousPage()}`);
  }
}

mixin(Horizon.prototype, OnScroll); /* ..and.. */ export default Horizon;
