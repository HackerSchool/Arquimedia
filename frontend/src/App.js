/* eslint-disable no-unused-vars */
import React from 'react';
import QuestionPage from './pages/QuestionPage.js';
import LoginPage from './pages/LoginPage.js';
import GenExamPage from './pages/GenExamPage.js';
import ExamPage from './pages/ExamPage.js';
import Navbar from './components/navbar/Navbar';
import ResultsPage from './pages/ResultsPage.js';
import RegistrationPage from './pages/RegistrationPage.js';
import QuestionSubmissionPage from './pages/QuestionSubmissionPage';
import SubmittedQuestions from './pages/SubmittedQuestions.js';
import LandingPage from './pages/LandingPage.js';
import ProfilePage from './pages/ProfilePage.js';
import PasswordResetPage from './pages/PasswordResetPage.js';
import PasswordResetConfirmPage from './pages/PasswordResetConfirmPage.js';
import LeaderboardPage from './pages/LeaderboardPage.js';
import PageNotFound from './pages/PageNotFound.js';
import ReportsPage from './pages/ReportsPage.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import globalTheme from './globalTheme';
import { ModRoute } from './routes/ModRoute.js';
import { AuthRoute } from './routes/AuthRoute.js';
import { UserContextProvider } from './context/UserContextProvider.js';
import { SnackbarProvider } from 'notistack';
import { SettingsPage } from './pages/SettingsPage.js';
import { AboutUsPage } from './pages/AboutUsPage.js';
import { MobileWarningPage } from './pages/MobileWarningPage.js';
import useMediaQuery from '@mui/material/useMediaQuery';

axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization');

function App() {
	const matches = useMediaQuery('(max-width:1000px)');

	return (
		<UserContextProvider>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={globalTheme}>
					<SnackbarProvider maxSnack={5}>
						<Router>
							<Switch>
								<Route path='/login' component={LoginPage} />
								<Route path='/registar' component={RegistrationPage} />
								<div>
									<Navbar />
										<Switch>
											<Route exact path='/' component={LandingPage} />
											<AuthRoute
												path='/questao/:id'
												component={QuestionPage}
											/>
											<AuthRoute path='/exames' component={GenExamPage} />
											<AuthRoute path='/exame/:id' component={ExamPage} />
											<AuthRoute
												path='/leaderboards'
												component={LeaderboardPage}
											/>
											<AuthRoute
												path='/resultado/:id'
												component={ResultsPage}
											/>
											<AuthRoute
												path='/submeter_questao'
												component={QuestionSubmissionPage}
											/>
											<ModRoute
												path='/questoes_submetidas'
												component={SubmittedQuestions}
											/>
											<ModRoute path='/reports' component={ReportsPage} />
											<AuthRoute path='/perfil' component={ProfilePage} />
											<Route
												path='/password/reset/confirm/:uid/:token'
												component={PasswordResetConfirmPage}
											/>
											<Route
												path='/password/reset'
												component={PasswordResetPage}
											/>
											<AuthRoute
												path='/configuracoes'
												component={SettingsPage}
											/>
											<Route path='/sobre' component={AboutUsPage} />
											<Route path='*' component={PageNotFound} />
										</Switch>
								</div>
							</Switch>
						</Router>
					</SnackbarProvider>
				</ThemeProvider>
			</StyledEngineProvider>
		</UserContextProvider>
	);
}

export default App;
