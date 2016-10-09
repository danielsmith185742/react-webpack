import React from 'react';
import ReactDOM from 'react-dom';
import NavbarInstance from './header.jsx';	
import Footer from './footer.jsx';	

import './css/bootstrap.min.css';
import './css/garage.css';

class About extends React.Component {
	render() {
		return (
			<div>
				<NavbarInstance />
			
				<Footer />
			</div>
			);
	}
}

ReactDOM.render(<About />, document.getElementsByClassName('application')[0]);

