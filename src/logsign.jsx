import React from 'react';
import ReactDOM from 'react-dom';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import NavbarInstance from './header.jsx';	
import UserId from './userid.jsx';	
import Footer from './footer.jsx';	
import LoginForm from './login.jsx';	
import CreateAccountForm from './createAccount.jsx';	
import Profile from './profile.jsx';	
import Spinner from 'react-spin';	
import './css/bootstrap.min.css';
import './css/garage.css';

var config = require('./spinnerconfig')

class LogSign extends React.Component {

	constructor(props) {
		super(props);
		this.state = { username : "Anonymous", message : " ", stopSpinner: true};
			
	}	
	refresh(username, message)
	{
		this.setState({username : username, message : message});
	}

	toggleSpinner()
	{
		this.setState({stopSpinner : !this.state.stopSpinner});
	}

	render() {
		
		var username = this.state.username;	
		var opts = config.spinnerConfig;	

		return (
			<div>
				<NavbarInstance />
				<UserId> {username} </UserId>
				<Jumbotron>
					<Grid fluid="true">
						<Row>
							<Col xs={1} md={1} />
								<Col xs={10} md={10} >
									<h1> Welcome </h1>
									<p> login or sign-up</p>
									<ButtonToolbar>
										<LoginForm onRefresh={this.refresh.bind(this)} onUpdate={this.toggleSpinner.bind(this)} />
										<CreateAccountForm  onRefresh={this.refresh.bind(this)} onUpdate={this.toggleSpinner.bind(this)} />
										<Profile onUpdate={this.toggleSpinner.bind(this)}> {username} </Profile>
									</ButtonToolbar>
									<p> {this.state.message} </p>
									<Spinner config={opts} stopped={this.state.stopSpinner}/>
								</Col>
							<Col xs={1} md={1} />
						</Row>
					</Grid>
				</Jumbotron>
				<Footer />
			</div>
			);
	}
}

ReactDOM.render(<LogSign />, document.getElementsByClassName('application')[0]);


