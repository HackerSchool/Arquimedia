import React from "react";
import QuestionPage from "./pages/QuestionPage.js";
import LoginPage from "./pages/LoginPage.js";
import GenExamPage from "./pages/GenExamPage.js";
import ExamPage from "./pages/ExamPage.js";
import Navbar from "./components/navbar/Navbar"
import {
	BrowserRouter as Router,
	Switch,
	Route,
  } from "react-router-dom";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = localStorage.getItem("Authorization");
  
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
			<Route path="/login" component={LoginPage} />
			<Route exact path="/exames" component={GenExamPage} />
			<Route exact path="/exame/:id" component={ExamPage} />
			</Switch>
		</Router>
	</div>
  );
}

export default App;
