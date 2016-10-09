import React from 'react';

var UserId = React.createClass({

	getInitialState()
	{
		return { userId : "Anonymous"};
	},
	componentDidMount()
	{

		var that = this;
		$.ajax({
				url: '/sessioninfo',
				dataType: 'json',
				cache: false,
				success: function(data){
					that.setState({userId : data.username});						
					window.userId = data.username;
				}.bind(this),
				error: function(xhr, status, err) {
		
				}.bind(this)
			});

	},

	render: function()
	{
		var user = this.props.children.toString().replace(/,/g,"").trim();
		var dbuser = this.state.userId;
		return (
			<p> You are logged in as : <b>{user == 'Anonymous' ? dbuser : user}</b></p>
		) ;
	}

});

export default UserId;
