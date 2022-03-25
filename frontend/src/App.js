import React from "react";
import QuestionPage from "./pages/QuestionPage.js";
import LoginPage from "./pages/LoginPage.js";
import GenExamPage from "./pages/GenExamPage.js";
import ExamPage from "./pages/ExamPage.js";
import Navbar from "./components/navbar/Navbar"
import ResultsPage from "./pages/ResultsPage.js"
import RegistrationPage from "./pages/RegistrationPage.js";
import QuestionSubmissionPage from "./pages/QuestionSubmissionPage";
import SubmittedQuestions from "./pages/SubmittedQuestions.js";
import LandingPage from "./pages/LandingPage.js";
import ProfilePage from "./pages/ProfilePage.js";
import PasswordResetPage from "./pages/PasswordResetPage.js";
import PasswordResetConfirmPage from "./pages/PasswordResetConfirmPage.js";
import LeaderboardPage from "./pages/LeaderboardPage.js";
import PageNotFound from "./pages/PageNotFound.js";
import {
	BrowserRouter as Router,
	Switch,
	Route,
  } from "react-router-dom";
import axios from "axios";
import {
	ThemeProvider,
} from "@material-ui/core/styles";
import globalTheme from "./globalTheme"

axios.defaults.headers.common["Authorization"] = localStorage.getItem("Authorization");

function App() {
  return (
	
		<ThemeProvider theme={globalTheme}>
			<Router>
				<Switch>
					<Route path="/login" component={LoginPage} />
					<Route exact path="/registar" component={RegistrationPage} />
					<div>
						<Navbar />
						<div style={{marginRight: "12em", marginLeft: "13em"}}>
							<Switch>
								<Route exact path="/" component={LandingPage}/>
								<Route exact path="/question/:id" component={QuestionPage} />
								<Route exact path="/exames" component={GenExamPage} />
								<Route exact path="/exame/:id" component={ExamPage} />
								<Route exact path="/leaderboards" component={LeaderboardPage} />
								<Route exact path="/resultado/:id" component={ResultsPage} />
								<Route exact path="/submeter_questao" component={QuestionSubmissionPage} />
								<Route exact path="/questoes_submetidas" component={SubmittedQuestions} />
								<Route exact path="/perfil" component={ProfilePage} />
								<Route exact path="/password/reset" component={PasswordResetPage} />
								<Route exact path="/password/reset/confirm/:uid/:token" component={PasswordResetConfirmPage} />
								<Route path="*" component={PageNotFound} />
							</Switch>
						</div>
					</div>
				</Switch>
			</Router>
		</ThemeProvider>
  );
}

export default App;
