import React from "react";
import View from "./_view.jsx";
import mixin from "react-mixin";
import { OnScroll } from "react-window-mixins";

class Horizon extends View {
  constructor(props) {
    super(props);

    this.bindFuncs("fetchChildren", "jumpToTop");

     // or innerheight < fetchDepth,
    if (!this.props.children || !this.props.children.length)
      this.fetchChildren();
  }

  render() {
    let loader, jumper;

    if (this.state.loading) {
      loader = "Loading...";
    }

    if (this.state.canJump) {
      jumper = <div onClick={this.jumpToTop}>Back</div>;
    }

    return (
      <section id="horizon">
        <div className="loading-container">{loader}</div>
        {this.props.children}
        <div className="jumping-container">{jumper}</div>
      </section>
    );
  }

  fetchChildren() {
    this.props.fetcher(this.state.fetchCall, (done) => {
      this.setState({
        loading: false,
        fetchCall: this.state.fetchCall + 1
      });
    });
  }

  onScroll() {
    let loading, canJump;
    let DOMNode = this.getDOMNode();
    let scrollPosition = window.pageYOffset - DOMNode.offsetTop;
    let scrollDepth = DOMNode.innerHeight - DOMNode.offsetTop;

    if (scrollPosition > 0) canJump = true;

    if ((scrollDepth < fetchDepth) && !this.state.loading)
      loading = true; /* ..and.. */ this.fetchChildren();

    this.setState({ scrollPosition, loading, canJump });
  }

  jumpToTop() {
    this.setState({ scrollPosition: 0 });
  }
}

export default mixin(Horizon.prototype, OnScroll);
