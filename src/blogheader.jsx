import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

var BlogHeader = React.createClass({
	
	render:function(){
		return (
			<Grid fluid="true">
			<Row>
				<Col xs={1} md={1} />
				<Col xs={10} md={10} >
					<h2><small>{this.props.datestamp}</small></h2>
					<h2><center><strong>{this.props.title}</strong></center></h2>
					<br />
				</Col>
				<Col xs={1} md={1} />
			</Row>
			</Grid>
	)}
});

export default BlogHeader;



