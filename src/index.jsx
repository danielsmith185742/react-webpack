import React from 'react';
import ReactDOM from 'react-dom';
import NavbarInstance from './header.jsx';	
import Footer from './footer.jsx';	
import CarouselInstance from './main.jsx';	

import './css/bootstrap.min.css';
import './css/garage.css';

class Index extends React.Component {
	render() {
		return (
			<div>
				<NavbarInstance />
				<CarouselInstance />
				<Footer />
			</div>
			);
	}
}

ReactDOM.render(<Index />, document.getElementsByClassName('application')[0]);

