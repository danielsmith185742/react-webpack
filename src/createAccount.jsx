import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

var CreateAccountForm = React.createClass({

	getInitialState()
	{
		return  { username: "", email: "", password: "",  retypePassword: "",usernameStatus: "",  emailStatus: "",  passwordStatus: "",   retypePasswordStatus: "", usernameHelp: " ",  emailHelp: " ",  passwordHelp: " ", retypePasswordHelp: " ", showModal: false, submitDisable: false , cancelDisable: false,  info : ""};
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

	checkPasswordStrength(password)
	{
	
		var passed=0;
		var strength = "";
		var status ="";

		if (password.length == 0)
		{
			this.setState({passwordHelp: " "});
			return;
		}

		var regex = new Array();
		regex.push("[A-Z]");
		regex.push("[a-z]");
		regex.push("[0-9]");
		regex.push("[$@$!%*#?&]");

		for (var i = 0;  i< regex.length; i++){
			if (new RegExp(regex[i]).test(password)) {
				passed++;
			}
		}

		if (password.length < 8)
		{
			if (passed>2) passed=2;
		}
		else
		{
			passed++
		}

		switch(passed){
			case 0:
			case 1:
				status = "error";
				strength = "extremely weak";
				break;
			case 2:
				status = "error";
				strength = "weak";
				break;
			case 3:
				status = "warning";
				strength = "fair";
				break;
			case 4:
				status = "success";
				strength = "strong";
				break;
			case 5:
				status = "success";
				strength = "very strong";
				break;
			}

		this.setState({passwordStatus: status});
		this.setState({passwordHelp: "Password strength is " + strength});
	},	

	handleUsernameChange: function(e){

		var re= /^[a-zA-Z0-9]*$/;
		if (!re.test(e.target.value) || e.target.value.length < 3)
		{
				this.setState({usernameHelp: "Username should be 3 characters minimum with no special characters"});	
				this.setState({usernameStatus: "error"});		
		}
		else
		{
				this.setState({usernameHelp: ""});	
				this.setState({usernameStatus: "success"});
		}
		this.setState({username: e.target.value});
	},

	handleEmailChange: function(e){
		
		{var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
			if (e.target.value == ''  || !re.test(e.target.value))
			{
				this.setState({emailStatus: "error", emailHelp : "Invalid email address"});
			}
			else
			{
				this.setState({emailStatus: "success", emailHelp : ""});
			}
		}
	
		this.setState({email: e.target.value});
	},

	handlePasswordChange: function(e){

		var password = e.target.value;
		this.setState({password: e.target.value});
		this.checkPasswordStrength(password);
		
	},

	handleRetypePasswordChange: function(e){

		this.setState({retypePassword: e.target.value});
		if  (e.target.value != this.state.password)
		{
			this.setState({retypePasswordStatus: "error"});
			this.setState({retypePasswordHelp: "Password does not match"});	
		}
		else
		{
			this.setState({retypePasswordStatus: "success"});
			this.setState({retypePasswordHelp: ""});
		}
		
	},

	handleSubmit: function(e)
	{		
		var username = this.state.username.trim();
		var email = this.state.email.trim();
		var password = this.state.password.trim();
		var usernameStatus = this.state.usernameStatus;
		var emailStatus = this.state.emailStatus;
		var passwordStatus = this.state.passwordStatus;
		var retypePasswordStatus = this.state.retypePasswordStatus;

		if ( !username || !email || !password || usernameStatus != "success" || emailStatus !="success" || passwordStatus =="error" || 
			retypePasswordStatus !="success"){
			return;
		}

		this.props.onUpdate();

		this.setState( {submitDisable : true} );
		this.setState( {cancelDisable : true} );

		$.ajax({
			url: "/credentials",
			dataType: 'json',
			type: 'POST',
			data: {username: username, email: email, password: password},
			success: function(response){

				this.props.onUpdate();
				this.setState( {submitDisable : false, cancelDisable : false} );
				//var parsed_response = $.parseJSON(response);
				if (response.status != "success")
				{
					switch (response.status)
					{
						case "username_taken" :  this.setState( {info : "Username is not available, please choose another"} );
						break;

						case "invalid_username" :  this.setState( {info : "Invalid username submitted"} );
						break;

						case "invalid_email" :  this.setState( {info : "Invalid email address submitted"} );
						break;

						case "invalid_password" :  this.setState( {info : "Invalid password submitted"} );
						break;

						default: this.setState( {info : response.status} );
					}
				}
				else
				{
					this.reset();
					this.close();
					this.props.onRefresh(username, "Your account has been successfully created");	
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
				<Button bsStyle="info" bsSize="large" onClick={this.open}> Sign up </Button>
				<Modal show={this.state.showModal} onHide={this.close}>
					<Modal.Header closeButton>
						<Modal.Title>Sign up</Modal.Title>
					</Modal.Header>
					<Modal.Body>
					<form>
						<FormGroup validationState={this.state.usernameStatus}>
							<ControlLabel>Username</ControlLabel>
							<FormControl type="text" placeholder="Enter username" value={this.state.username} onChange={this.handleUsernameChange}/>
							<FormControl.Feedback >
								<Glyphicon glyph="music" />
							</FormControl.Feedback>
							<HelpBlock>{this.state.usernameHelp} </HelpBlock>
						</FormGroup>
						<FormGroup validationState={this.state.emailStatus}>
							<ControlLabel>Email address</ControlLabel>
							<FormControl type="email" placeholder="Enter address" value={this.state.email} onChange={this.handleEmailChange}/>
							<HelpBlock>{this.state.emailHelp} </HelpBlock>
						</FormGroup>
						<FormGroup validationState={this.state.passwordStatus}>
							<ControlLabel>Password</ControlLabel>
							<FormControl type="password" value={this.state.password} onChange={this.handlePasswordChange} />
							<HelpBlock>{this.state.passwordHelp} </HelpBlock>
						</FormGroup>
						<FormGroup validationState={this.state.retypePasswordStatus}>
							<ControlLabel>Retype Password</ControlLabel>
							<FormControl type="password" value={this.state.retypePassword} onChange={this.handleRetypePasswordChange} />
							<HelpBlock>{this.state.retypePasswordHelp} </HelpBlock>
						</FormGroup>
						<HelpBlock>{this.state.info} </HelpBlock>
					</form>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.close}>Close</Button>
						<Button  disabled={this.state.submitDisable}  onClick={this.handleSubmit} bsStyle="default">Submit</Button>
					</Modal.Footer>
				</Modal>

			</div>

			);}

});

export default CreateAccountForm;

