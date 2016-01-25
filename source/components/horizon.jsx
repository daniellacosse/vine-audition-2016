import React from "react";
import ReactDOM from "react-dom";
import View from "./_view.jsx";
import { Grid } from "react-bootstrap";

import mixin from "react-mixin";
import { OnScroll } from "react-window-mixins";

class Horizon extends View {
  constructor(props) {
    super(props);

    this.bindFuncs("fetchChildren", "jumpToTop", "onScroll");

    this.state.fetchCall = 0;
  }

  render() {
    let loader, jumper;

    if (this.state.fetching) {
      loader = <span className="loader">Loading...</span>;
    }

    if (this.state.canJump) {
      jumper = <div className="jumper" onClick={this.jumpToTop}>Back</div>;
    }

    return (
      <section id="horizon">
        <div className="loading-container">{loader}</div>
        <Grid>{this.props.children}</Grid>
        <div className="jumping-container">{jumper}</div>
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
    let canJump, { clientHeight, offsetTop } = this.getDOMNode();
    let {fetchDepth} = this.props;
    let scrollPosition = window.pageYOffset - offsetTop;
    let scrollDepth = clientHeight - scrollPosition;

    if (scrollPosition > window.innerHeight) canJump = true;

    if ((scrollDepth < fetchDepth) || (clientHeight < fetchDepth))
      this.fetchChildren();

    this.setState({ scrollPosition, canJump });
  }

  jumpToTop() {
    scroll(0, 0);
    this.setState({ scrollPosition: 0 });
  }
}

mixin(Horizon.prototype, OnScroll); /* ..and.. */ export default Horizon;
