import React from 'react';
import ReactDOM from 'react-dom';
import NavbarInstance from './header.jsx';	
import Footer from './footer.jsx';	
import BlogItem from './blogitem.jsx';	
import './css/bootstrap.min.css';
import './css/garage.css';

class Blog extends React.Component {

	constructor(props) {
		super(props);
			
	}	

	render() {

		return (
			<div>
				<NavbarInstance />
				<BlogItem title="Getting started with VHDL and FPGA" datestamp="2016-01-03" pageref="001">
					<p> After recently reading an article on how Microsoft is extending FPGA usage to Deep Learning applications I decided it was about time I learnt a little bit more about FPGAs. It seems that Microsoft has been researching the use of FPGAs as an alternative to GPUs for machine learning applications and released a white paper in February 2015. 
					</p>
				</BlogItem>
				<Footer />
			</div>
			);
	}
}

ReactDOM.render(<Blog />, document.getElementsByClassName('application')[0]);


