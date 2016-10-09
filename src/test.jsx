import React from 'react';
import ReactDOM from 'react-dom';
import Spinner from 'react-spin';	
import './css/bootstrap.min.css';
import './css/garage.css';

var config = require('./spinnerconfig')

class Test extends React.Component {

	render() {
		var opts = config.spinnerConfig;
		return (
			<div>
				<h1> Loader </h1>
				<Spinner config={opts} stopped={false}/>
			</div>
			);
	}
}

ReactDOM.render(<Test />, document.getElementsByClassName('application')[0]);

