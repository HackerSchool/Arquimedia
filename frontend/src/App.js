import React, { Component } from "react";
import { render } from "react-dom";
import QuestionPage from "./pages/QuestionPage.js";
import Navbar from "./components/navbar/Navbar"
import {
	BrowserRouter as Router,
	Switch,
	Route,
  } from "react-router-dom";


function App() {
  return (
    <div>
		<Navbar />

		<Router>
			<Switch>
			<Route exact path="/test">
				<p>This is the home page</p>
			</Route>
			<Route path="/question/:id" component={QuestionPage} />
			</Switch>
		</Router>
	</div>
  );
}

export default App;
