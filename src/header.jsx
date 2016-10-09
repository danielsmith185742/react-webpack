import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Image from 'react-bootstrap/lib/Image';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

const NavbarInstance = React.createClass({
	
	render:function(){
		return (
		<div id="garage-banner" ><center><Image src="img/logo-main-theme2.jpg"  height="75"/></center>
		<Navbar bsStyle="inverse">
			<Navbar.Header>
				<Navbar.Brand>
					Garage
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
			<Navbar.Collapse>
				<Nav>
					<NavItem eventKey={1} href="index.html">Home</NavItem>
					<NavItem eventKey={2} href="about.html">About</NavItem>
					<NavItem eventKey={3} href="blog.html">Blog</NavItem>
					<NavItem eventKey={4} href="messageboard.html">MessageBoard</NavItem>
					<NavItem eventKey={5} href="login.html">Login</NavItem>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
		</div>
	)}
});

export default NavbarInstance;



