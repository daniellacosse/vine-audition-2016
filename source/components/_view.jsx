import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class View extends Component {
	constructor(props) {
		super(props);

		this.state = {};

		this.bindFuncs("getDOMNode", "dontBubble");
	}

	getDOMNode() {
		return ReactDOM.findDOMNode(this);
	}

	bindFuncs(...funcs) {
		funcs.forEach(func => this[func] = this[func].bind(this));
	}

	dontBubble(event) {
		event.stopPropagation();
	}
}
