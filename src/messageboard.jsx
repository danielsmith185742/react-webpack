import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Form from 'react-bootstrap/lib/Form';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Well from 'react-bootstrap/lib/Well';
import Panel from 'react-bootstrap/lib/Panel';
import PanelGroup from 'react-bootstrap/lib/PanelGroup';
import Navbar from 'react-bootstrap/lib/Navbar';
import Media from 'react-bootstrap/lib/Media';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Pagination from 'react-bootstrap/lib/Pagination';
import io from 'socket.io-client';

var socket = io.connect('/');

var Comment = React.createClass({
	render: function() {
		return (
				<div>
				<Grid fluid="true">
					<Row>
						<Col xs={2} md={2}>
							<b>{this.props.author}</b> 
						</Col>
						<Col xs={10} md={10} >
							<p>posted {this.props.time}  {this.props.date} </p>
						</Col>
					</Row>
				</Grid>
				<Well>
					<Media>
						<Media.Left>
							<img src={this.props.userimage} alt="Img" height="50"  />	
						</Media.Left>
						<Media.Body>
							<p>{this.props.children}</p>
						</Media.Body>		
					</Media>
				</Well>
				<br />
				</div>
		);
	}
});

var CommentList = React.createClass({
	render: function() {
		var commentNodes = this.props.data.map(function(comment) {
			return (
				<Comment author={comment.author}  time={(new Date(comment.timestamp)).toLocaleTimeString()} 
					date={(new Date(comment.timestamp)).toLocaleDateString()}
					userimage={comment.userimage} >
					{comment.text}
				</Comment>
		);
	});
	return (
		<div className="commentList">
			{commentNodes}
		</div>
		);
	}
});

var CommentForm = React.createClass({
	getInitialState: function() {
		return {text: ''};
	},
	handleTextChange: function(e){
		this.setState({text: e.target.value});
	},
	handleSubmit: function(e){
		e.preventDefault();
		var text = this.state.text.trim();
		var author = this.props.username;
		if ( !text){
			return;
		}
		this.props.onCommentSubmit({author: author, text: text});
		this.setState({text:''});
		location.hash = "#top"
	},
	render: function() {
		return (

			<Navbar  fixedBottom="true"  onClick={this.handleSubmit}>
			<Navbar.Form inline>			
				<FormGroup controlId="formInlineName">
					<ControlLabel>{this.props.username}</ControlLabel>
					{' '}
				</FormGroup>
				{' '}
				<FormGroup controlId="formInlineComment">
					<ControlLabel>Comment</ControlLabel>
					{' '}
					<FormControl type="text" placeholder="Say something" value={this.state.text} onChange={this.handleTextChange} />
				</FormGroup>
				{' '}
				<Button type="submit" bsStyle="primary" >
					Post
				</Button>
			</Navbar.Form>
			</Navbar>
		);
	}
});

var CommentBox = React.createClass({
	getInitialState: function() {
		return {data: [], messages: [], visible: false, author: "Anonymous", userimage: "user/user.jpg", comment_size : 0, page_index: 1, number_page : 1, verbose : 0 };
	},
	componentDidMount(){

		$.ajax({
			url: '/sessioninfo',
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({author : data.username, userimage : data.image});
				this.initComments();
				if (data.username != "Anonymous")
				{ 
					this.setState({visible: true});
				}
			}.bind(this),
			error: function(xhr, status, err) {
	
			}.bind(this)
		});

		if (this.props.refreshComment)
		{
			socket.on('user', this.updateComments);
		}
	},
	initComments: function()
	{

		var filter = {page: this.props.page};

		$.ajax({
			url: '/messageboard',
			dataType: 'json',
			type: 'POST',	
			data: filter,
			success: function(data){
				this.updateComments(data);
			}.bind(this),
			error: function(xhr, status, err) {
	
			}.bind(this)
		});
	},
	updateComments: function(data) {

		var currentSize = this.state.comment_size;

		if (data.length > currentSize)
		{
			this.refreshComments(data, data.length, this.state.page_index);
		}
		else
		{
			this.setState({data: data, comment_size : data.length});
		}

	},
	refreshComments: function(data, dataLength, pageIndex){
		
		var messages = [];
		var start = (pageIndex-1)*8;
		var end = start + 8;
		var commentSize = dataLength;
		var noPages = Math.floor(commentSize/8);

		if (commentSize%8!=0)
		{
			noPages = noPages + 1;
		}

		for (var i=start; i<end && i <dataLength; i++)
		{
			messages.push(data[i]);
		}

		this.setState({number_page : noPages, messages: messages, data : data, comment_size : dataLength, page_index : pageIndex});

	},
	handleCommentSubmit: function(comment)
	{

		var userimage = this.state.userimage;
		var messageList =this.state.data.reverse();
		messageList.push({author : comment.author, text : comment.text, timestamp: Date.now(), userimage : userimage, page : this.props.page, messageno :  messageList.length +1, _id : "r" + toString(messageList.length +1)});
		this.refreshComments(messageList.reverse(), messageList.length, this.state.page_index);
	
		$.extend(comment, { page : this.props.page});

		$.ajax({
			url: "/data",
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function(response){

			}.bind(this),
			error: function(xhr, status, err) {
				console.error("/data", status, err.toString());
			}.bind(this)
		});

		

	},
	handlePaginationSelect: function(eventKey)
	{
		this.refreshComments(this.state.data, this.state.comment_size, eventKey);
	},
	render: function() {
		return (
			<div className="commentBox">
			<a name="top"></a>
			<Grid fluid="true">
			<Row>
				<Col xs={1} md={1} />
				<Col xs={10} md={10} >
				
			<h2><center><strong>{this.props.title}</strong></center></h2>
				<br />
				<CommentList data={this.state.messages}/>
				{ this.state.visible ? <CommentForm onCommentSubmit={this.handleCommentSubmit}  username={this.state.author}/> :  null }



				</Col>
				<Col xs={1} md={1} />
			</Row>
			</Grid>
			<Pagination bsSize="medium" items={this.state.number_page} activePage={this.state.page_index} onSelect=	{this.handlePaginationSelect} />

			</div>
		);
	}
});

export default CommentBox;

