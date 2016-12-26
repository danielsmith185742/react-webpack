import React from 'react';
import Crypto from 'crypto';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel  from 'react-bootstrap/lib/ControlLabel';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';


var LoginForm = React.createClass({


	getInitialState()
	{
		return  { username: "", email: "", password: "",  retypePassword: "",usernameStatus: "",  emailStatus: "",  passwordStatus: "",   retypePasswordStatus: "", usernameHelp: " ",  emailHelp: " ",  passwordHelp: " ", retypePasswordHelp: " ", showModal: false, submitDisable: false , cancelDisable: false,  info : "" };
	},

	reset()
	{

		this.setState({username: ""});
		this.setState({email: ""}); 
		this.setState({password: ""}); 
		this.setState({retypePassword: ""}); 
		this.setState({usernameStatus: ""});   
		this.setState({emailStatus: ""});   
		this.setState({passwordStatus: ""});   
		this.setState({retypePasswordStatus: ""});   
		this.setState({usernameHelp: " "});   
		this.setState({emailHelp: " "});   
		this.setState({passwordHelp: " "}); 
		this.setState({retypePasswordHelp: ""});   
		this.setState({info: " "}); 
	},

	close()
	{
		this.setState({ showModal: false});
	},

	open()
	{
		this.setState({ showModal: true});
	},

	handleUsernameChange: function(e){

		this.setState({username: e.target.value});
	},

	handlePasswordChange: function(e){

		var password = e.target.value;
		this.setState({password: e.target.value});
	},

	handleSubmit: function(e)
	{		
	
		this.props.onUpdate();
		var username = this.state.username.trim();
		var password = this.state.password.trim();

		if ( !username || !password){
			return;
		}

		this.setState( {submitDisable : true} );
		this.setState( {cancelDisable : true} );

		var passwordHash = Crypto.createHash('md5').update(password).digest('hex');

		$.ajax({
			url: "/login",
			dataType: 'json',
			type: 'POST',
			data: {username: username, password: passwordHash},
			success: function(response){

				this.props.onUpdate();
				this.setState( {submitDisable : false, cancelDisable : false} );

				if (response.status != "success")
				{
					switch (response.status)
					{
						default: this.setState( {info : "Login failed"} );
					}
				}
				else
				{
					this.reset();
					this.close();
					this.props.onRefresh(username, "Successfully logged in");					
				}
			}.bind(this),
			error: function(xhr, status, err) {
				this.props.onUpdate();
				alert("failure")
				this.setState( {submitDisable : false} );
				this.setState( {cancelDisable : false} );
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});


	},

	render: function(){
		return (
			<div>
					<Button bsStyle="info" bsSize="large" onClick={this.open}> Login </Button>
		
				<Modal show={this.state.showModal} onHide={this.close}>
					<Modal.Header closeButton>
						<Modal.Title>Login</Modal.Title>
					</Modal.Header>
					<Modal.Body>
					<form>
						<FormGroup>
							<ControlLabel>Username</ControlLabel>
							<FormControl type="text" placeholder="Enter username" value={this.state.username} onChange={this.handleUsernameChange}/>
							<HelpBlock>{this.state.usernameHelp} </HelpBlock>
						</FormGroup>
						<FormGroup validationState={this.state.passwordStatus}>
							<ControlLabel>Password</ControlLabel>
							<FormControl type="password" value={this.state.password} onChange={this.handlePasswordChange} />
							<HelpBlock>{this.state.passwordHelp} </HelpBlock>
						</FormGroup>
						<HelpBlock>{this.state.info} </HelpBlock>
					</form>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.close}>Close</Button>
						<Button  disabled={this.state.submitDisable}  onClick={this.handleSubmit} bsStyle="default">OK</Button>
					</Modal.Footer>
				</Modal>

			</div>

			);}

}
);
export default LoginForm;






