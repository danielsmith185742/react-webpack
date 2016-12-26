import React from 'react';
import Crypto from 'crypto';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Image from 'react-bootstrap/lib/Image';
import Button from 'react-bootstrap/lib/Button';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Modal from 'react-bootstrap/lib/Modal';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

var Profile = React.createClass({

	getInitialState: function() {
		return { imageSrc : "img/user.jpg",  tmpImage : "img/user.jpg",  fileType : "", status : "Drop and drag image", username : "Anonymous", email : "", tmpEmail : "", profile : "", tmpProfile : "", showEdit : false, showInfo : true, showPassword : false, emailHelp : "", emailStatus : "success", saveStatus : false, passwordHelp : "", tmpPassword : "", tmpPasswordStatus : "", password : "", passwordStatus : "", retypePassword : "", retypePasswordHelp : "", retypePasswordStatus : "", savePasswordStatus : true, passwordInputHelp : "", showModal: false };
	},
	close()
	{
		this.setState({ showModal: false});
	},

	open()
	{
		this.setState({ showModal: true});
	},
	onDragOver : function(e){
		e.preventDefault();
	},
	onDrop : function(event){
		event.preventDefault();
		var files = event.dataTransfer.files;

		if (files.length>1)
		{
			this.setState({ status : "Multiple image files can't be uploaded"});
			return
		}

		var fileSize = files[0].size;	

		if (fileSize > 15000)
		{
			this.setState({ status : "File size too big, must be <15000  kb."});
			return;
		}

		this.setState({ filename : files[0].name, fileType :  files[0].type });
	
		var blob = files[0];

		var fileReader = new FileReader();
		var that=this;
		fileReader.onloadend = function(e){

			that.setState({ tmpImage : e.target.result, status : "" });

		};

		fileReader.readAsDataURL(blob);
		
	},
	getSessionInfo()
	{
		$.ajax({
			url: '/sessioninfo',
			dataType: 'json',
			cache: false,
			success: function(data){
				if (data.username != "Anonymous")
				{ 
					this.setState({username : data.username,  imageSrc : data.image, tmpImage : data.image, email : data.email, tmpEmail : data.email, profile : data.profile, tmpProfile : data.profile});
				}
				else
				{

				}
			}.bind(this),
			error: function(xhr, status, err) {
	
			}.bind(this)
		});

	},
	componentDidMount(){

		this.getSessionInfo();
	},
	handleEmailChange: function(e){

		{var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;
			if (e.target.value == ''  || !re.test(e.target.value))
			{
				this.setState({tmpEmail: e.target.value, emailStatus: "error", emailHelp: "Not a valid e-maill address", saveStatus : true});
			}
			else
			{
				this.setState({tmpEmail: e.target.value, emailStatus: "success", emailHelp: "", saveStatus : false});
			}
		}		
	},
	handleProfileChange: function(e){

		this.setState({tmpProfile: e.target.value});
		
	},
	handleEdit: function(e){

		this.setState({showEdit: true, showInfo : false});
		
	},
	handleCancel: function(e){

		if (this.state.showPassword)
		{
			this.setState({tmpPassword: "", passwordStatus : "", passwordHelp : "", password : "", retypePassword : "", retypePasswordHelp : "", retypePasswordStatus : "", tmpPasswordStatus : "", savePasswordStatus : true});
		}

		this.setState({showPassword: false, showEdit: false, showInfo : true});
		
	},
	handleReset: function(e){

			this.setState({ tmpImage : this.state.imageSrc, tmpEmail :  this.state.email, tmpProfile : this.state.profile, emailStatus: "success", emailHelp: ""});
		
	},
	handlePassword: function(e){


		this.setState({showPassword: true});

	},
	handlePasswordInput: function(e){

		if (e.target.value.length > 0)
		{
			this.setState({password: e.target.value, passwordStatus : "success", passwordInputHelp : ""});	
			this.maybeEnableSave("success", this.state.tmpPasswordStatus, this.state.retypePasswordStatus);
		}
		else
		{
			this.setState({password: e.target.value, passwordStatus : "", passwordInputHelp : ""});
			this.maybeEnableSave("", this.state.tmpPasswordStatus, this.state.retypePasswordStatus);
		}

		
	},
	maybeEnableSave(passwordStatus, tmpPasswordStatus, retypePasswordStatus)
	{
		if (passwordStatus == "success" && tmpPasswordStatus == "success" && retypePasswordStatus == "success")
		{
			this.setState({savePasswordStatus : false});
		}
		else
		{
			this.setState({savePasswordStatus : true});
		}
	},
	handlePasswordChange: function(e){

		var password = e.target.value;
		this.setState({tmpPassword: password});
		this.checkPasswordStrength(password);
		
	},
	handleRetypePasswordChange: function(e){

		this.setState({retypePassword: e.target.value});
		if  (e.target.value != this.state.tmpPassword)
		{
			this.setState({retypePasswordStatus: "error", retypePasswordHelp: "Password does not match"});
			this.maybeEnableSave(this.state.passwordStatus, this.state.tmpPasswordStatus, "");
		}
		else
		{
			this.setState({retypePasswordStatus: "success", retypePasswordHelp: ""});
			this.maybeEnableSave(this.state.passwordStatus, this.state.tmpPasswordStatus, "success");
		}
		
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

		this.setState({tmpPasswordStatus: status, passwordHelp: "Password strength is " + strength});
		this.maybeEnableSave(this.state.passwordStatus, status, this.state.retypePasswordStatus);
	},	
	handlePasswordSave: function(e)
	{
		var oldPasswordHash = Crypto.createHash('md5').update(this.state.password).digest('hex');
		var newPasswordHash = Crypto.createHash('md5').update( this.state.tmpPassword).digest('hex');

		var password =  { password : oldPasswordHash, newPassword : newPasswordHash};

		this.setState({savePasswordStatus : true}); //should also temporarily disable the cancel button
		this.props.onUpdate();

		$.ajax({
			url: "/change_password",
			dataType: 'json',
			type: 'POST',
			data: password,
			success: function(response){

				this.props.onUpdate();			
				if (response.status != "success")
				{
					switch (response.status)
					{
						case "invalid_password" :  this.setState( {passwordInputHelp : "Incorrect Password", showPassword : true, passwordStatus : "error"} );
						break;

						default: this.setState( {passwordInputHelp : response.status, showPassword : true, passwordStatus : "error"} );
					}
				}
				else
				{
						this.setState({password : "", tmpPassword : "", retypePassword : "", showPassword: false, showEdit: false, showInfo : true,  passwordStatus : "", passwordHelp : "", retypePasswordHelp : "", retypePasswordStatus : "", tmpPasswordStatus : "", savePasswordStatus : true});

				}

			}.bind(this),
			error: function(xhr, status, err) {
				this.props.onUpdate();
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});

	},
	handleSave: function(e){

		var user_image =  { image : this.state.tmpImage, fileType : this.state.fileType, email : this.state.tmpEmail, profile : this.state.tmpProfile  };
		this.setState({imageSrc : this.state.tmpImage, email : this.state.tmpEmail, profile : this.state.tmpProfile, showPassword: false, showEdit: false, showInfo : true});

		this.props.onUpdate();

		$.ajax({
			url: "/profile_upload",
			dataType: 'json',
			type: 'POST',
			data: user_image,
			success: function(response){
				
				this.props.onUpdate();

			}.bind(this),
			error: function(xhr, status, err) {
				
				this.props.onUpdate();
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});

	},
	render: function()
	{
		var user = this.props.children.toString().replace(/,/g,"").trim();
		var buttonEnabled = false;		
	
		if (user != this.state.username && user !="Anonymous")
		{	
			this.getSessionInfo();
		}

		if (this.state.username != "Anonymous")
		{
			buttonEnabled= true;
		}

		return (
			<div>
				{(buttonEnabled)? <Button bsStyle="info" bsSize="large" onClick={this.open} active> Edit Profile </Button> :
					<Button bsStyle="info" bsSize="large" onClick={this.open} disabled> Edit Profile </Button>}
				<Modal show={this.state.showModal} onHide={this.close}>
					<Modal.Header closeButton>
						<Modal.Title>User Profile </Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Grid>
							{(this.state.showInfo ? <Row>
								<Col xs={3} md={3} >
									<Image width={128} height={128} src={this.state.imageSrc} />
								</Col>
								<Col xs={9} md={9} >
									<p><b>Username : </b>{this.state.username}</p>
									<p><b>E-mail : </b>{this.state.email}</p>
									<p><b>Info : </b>{this.state.profile}</p>
								</Col>
							</Row> : <Row />)}
							{(this.state.showEdit ? <Row >
								<Col xs={3} md={3} >
									<Image width={128} height={128} src={this.state.tmpImage} rounded  onDragOver={this.onDragOver} onDrop={this.onDrop}   id="user_file" />
									<HelpBlock>{this.state.status} </HelpBlock>
								</Col>
								<Col xs={6} md={6} >
									<p><b>Username : </b>{this.state.username}</p>
									<form>
										<FormGroup>
											<Col xs={8} md={8} >
												<ControlLabel>E-mail</ControlLabel>
													<FormControl type="text" placeholder={this.state.email} value={this.state.tmpEmail} onChange={this.handleEmailChange}/>
												<HelpBlock>{this.state.emailHelp} </HelpBlock>
												<ControlLabel>Profile</ControlLabel>
													<FormControl type="textarea" placeholder={this.state.profile} value={this.state.tmpProfile} onChange={this.handleProfileChange}/>
												</Col>
										</FormGroup>
									</form>
								</Col>
							</Row> : <Row /> )}
							{(this.state.showPassword ? <Row>
								<br />
								<form>
									<Col xs={7} md={7} >
										<FormGroup validationState={this.state.passwordStatus}>
											<ControlLabel>Enter current password</ControlLabel>
											<FormControl type="password"  value={this.state.password} onChange={this.handlePasswordInput}/>
											<HelpBlock>{this.state.passwordInputHelp} </HelpBlock>
										</FormGroup>
										<FormGroup validationState={this.state.tmpPasswordStatus}>
											<ControlLabel>Enter new password</ControlLabel>
											<FormControl type="password"  value={this.state.tmpPassword} onChange={this.handlePasswordChange}/>
											<HelpBlock>{this.state.passwordHelp} </HelpBlock>
										</FormGroup>
										<FormGroup validationState={this.state.retypePasswordStatus}>
											<ControlLabel>Retype new password</ControlLabel>
											<FormControl type="password" value={this.state.retypePassword} onChange={this.handleRetypePasswordChange} />
											<HelpBlock>{this.state.retypePasswordHelp} </HelpBlock>
										</FormGroup>
									</Col>
								</form>
							</Row> : <Row />)}
						</Grid>
					</Modal.Body>
					<Modal.Footer>
						{(this.state.showInfo && !this.state.showPassword? <Button onClick={this.handlePassword} > Change password </Button>  : null )}
						{(this.state.showEdit || this.state.showPassword ? <Button onClick={this.handleCancel}> Cancel </Button> : null )}
						{(this.state.showEdit ? <Button onClick={this.handleReset}> Reset </Button> : null )}
						{(this.state.showInfo && !this.state.showPassword ? <Button onClick={this.handleEdit}> Edit Profile</Button> : null )}
						{(this.state.showEdit ? <Button type="submit" bsStyle="primary" onClick={this.handleSave} disabled={this.state.saveStatus}> save </Button> : null )}
						{(this.state.showPassword ? <Button type="submit" bsStyle="primary" onClick={this.handlePasswordSave} disabled={this.state.savePasswordStatus}> save </Button> : null )}
						{(!this.state.showEdit && !this.state.showPassword? <Button onClick={this.close} > Done </Button>  : null )}
					</Modal.Footer>
				</Modal>
			</div>) ;
	}

});

export default Profile;


