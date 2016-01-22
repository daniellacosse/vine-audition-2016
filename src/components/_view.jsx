import React, { Component } from "react";

export default class View extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	bindFuncs(...funcs) {
		funcs.forEach(func => this[func] = this[func].bind(this));
	}
}
