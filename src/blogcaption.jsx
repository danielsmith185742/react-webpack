import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Media from 'react-bootstrap/lib/Media';

var BlogCaption = React.createClass({
	
	render:function(){
		return (
			<Grid fluid="true">
			<Row>
				<Col xs={1} md={1} />
				<Col xs={10} md={10} >
					<Media>
						<Media.Body>
							<Media.Heading> {this.props.title} </Media.Heading>
							<br />
							{this.props.children}
						</Media.Body>
					</Media>
					<br />
				</Col>
				<Col xs={1} md={1} />
			</Row>
			</Grid>
	)}
});

export default BlogCaption;



