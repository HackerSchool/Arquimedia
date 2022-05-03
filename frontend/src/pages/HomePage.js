import React, { Component } from 'react';
import QuestionPage from './QuestionPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default class HomePage extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path='/test'>
						<p>This is the home page</p>
					</Route>
					<Route path='/question/:id' component={QuestionPage} />
				</Switch>
			</Router>
		);
	}
}
