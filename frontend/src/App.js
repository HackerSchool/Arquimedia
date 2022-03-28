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
import {ModRoute} from "./components/routes/ModRoute.js"
import {AuthRoute} from "./components/routes/AuthRoute.js"
import { UserContextProvider} from "./context/UserContextProvider.js"

axios.defaults.headers.common["Authorization"] = localStorage.getItem("Authorization");

function App() {

	return (
		<UserContextProvider>
			<ThemeProvider theme={globalTheme}>
				<Router>
					<Switch>
						<Route path="/login" component={LoginPage} />
						<Route exact path="/registar" component={RegistrationPage} />
					</Switch>
					<Navbar />
					<div style={{marginRight: "12em", marginLeft: "13em"}}>
						<Switch>
							<AuthRoute exact path="/" component={LandingPage}/>
							<AuthRoute exact path="/question/:id" component={QuestionPage} />
							<AuthRoute exact path="/exames" component={GenExamPage} />
							<AuthRoute exact path="/exame/:id" component={ExamPage} />
							<AuthRoute exact path="/leaderboards" component={LeaderboardPage} />
							<AuthRoute exact path="/resultado/:id" component={ResultsPage} />
							<AuthRoute exact path="/submeter_questao" component={QuestionSubmissionPage} />
							<ModRoute exact path="/questoes_submetidas" component={SubmittedQuestions} />
							<AuthRoute exact path="/perfil" component={ProfilePage} />
							<AuthRoute exact path="/password/reset" component={PasswordResetPage} />
							<AuthRoute exact path="/password/reset/confirm/:uid/:token" component={PasswordResetConfirmPage} />
							<AuthRoute path="*" component={PageNotFound} />
						</Switch>
					</div>
				</Router>
			</ThemeProvider>
		</UserContextProvider>
	);
}

export default App;
