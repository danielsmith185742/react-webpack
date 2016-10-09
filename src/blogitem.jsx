import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

var BlogItem = React.createClass({
	
	render:function(){
		return (
			<div>
				<Grid fluid="true">
					<Row>
						<Col xs={1} md={1} />
						<Col xs={10} md={10}>
							<span class="time">{this.props.datestamp}</span>
							<h4>{this.props.title}</h4>
								{this.props.children}
							<a href={"blog" + this.props.pageref + ".html"} >Read more&gt;&gt;</a>
						</Col>
						<Col xs={1} md={1} />
					</Row>
				</Grid>	
				<br />
			</div>
	)}
});

export default BlogItem;



