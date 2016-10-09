
import React from 'react';
var Loader = require('react-loader');

var LoaderInstance = React.createClass({
	
	genInitialState: function () {
		return { loaded: false, profile: null };
	},
	
	componentDidMount: function() {
		new Profile({ id: this.props.id }).fetch({
			success: this.onSuccess,
			error: this.onError
			})
	},

	onSuccess: function (profile) {

	},

	onError: function (err){

	},

	render: function() {
		return (

				<div>
				<h1>Test </h1>
					<Loader loaded={this.state.loaded} >
						<Profile model={this.state.profile} />
					</Loader>
				</div>
		);
	}
});

export default LoaderInstance;

