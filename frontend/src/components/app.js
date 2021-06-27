import React, { Component } from "react";
import { render } from "react-dom";
var Latex = require('react-latex');

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		const Test = "$\\frac{\\partial u}{\\partial K}$";
		return <h1><Latex>{Test}</Latex></h1>;
	}
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);