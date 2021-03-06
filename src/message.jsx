import React from 'react';
import ReactDOM from 'react-dom';
import NavbarInstance from './header.jsx';	
import Footer from './footer.jsx';	
import CommentBox from './commentboard.jsx';	
import './css/bootstrap.min.css';
import './css/garage.css';

class Message extends React.Component {

	constructor(props) {
		super(props);
			
	}	

	render() {

		return (
			<div>
				<NavbarInstance />
				<CommentBox page="main" title="Message Board"  refreshComment />
				<Footer />
			</div>
			);
	}
}

ReactDOM.render(<Message />, document.getElementsByClassName('application')[0]);


