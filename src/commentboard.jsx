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
import CommentWindow from './commentWindow.jsx'

var socket = io.connect('/');

var Comment = React.createClass({
	getInitialState: function() {
		return {collapsed: false};
	},
	render: function() {
		return (
				<div>
				<Col xs={this.props.depth} md={this.props.depth} />
				<Col xs={12-this.props.depth} md={12-this.props.depth} >		
					<Row>	
						<Col xs={2} md={2}>
							<b>{this.props.author}</b> 
						</Col>
						<Col xs={8} md={8} >
							<p> {this.props.depth==0? "posted" : "replied"} {this.props.time}  {this.props.date} </p>
						</Col>
						<Col xs={2} md={2}>		
							<Row>	
							<Col xs={6} md={6}>	
								<Button bsStyle="link" bsSize="small"onClick={ ()=> this.setState({ collapsed : !this.state.collapsed })}> 
									{this.state.collapsed ? "expand" : "collapse"} 
								</Button>
							</Col>
							<Col xs={6} md={6}>	
								<CommentWindow username={this.props.username} onCommentSubmit={this.props.onCommentSubmit} visible={this.props.visible} label="Reply" depth={this.props.depth} messageparent={this.props.messageno}/>
							</Col> 
							</Row>	
						</Col>
					</Row>	
					<Row>
						<Panel collapsible expanded={!this.state.collapsed}>	
							<Well>
								<Media>
									<Media.Left>
										<img src={this.props.userimage} alt="Img" height="50"  />	
									</Media.Left>
									<Media.Body>
										<p>{this.props.children}</p>
									</Media.Body>		
								</Media>
								<br />
							</Well>
							{this.props.child==null? "" : this.props.child.map(this.props.RenderElement) }
						</Panel>
					</Row>
				</Col>
				</div>
		);
	}
});

var CommentList = React.createClass({

	buildTree: function(data,depth)
	{
		var tree = [];
		var k=0;
		var i=0;
		var parent;
		var localPrevious;

		while (i<data.length)
		{

			var messageno = data[i].messageno;
			var parent = data[i].messageparent;
		
			if (data[i].depth==depth)
			{
				tree[k] = { data : data[i], child : null };
				localPrevious = tree[k];
				k=k+1;
				i=i+1;
			}
			else
			{

				if(localPrevious.data.depth < data[i].depth)
				{
					var tmp = data.slice();
					tmp=tmp.splice(i,data.length);
					var subTree = this.buildTree(tmp, data[i].depth);
					localPrevious.child = subTree.branch;
					i = i + subTree.index;		
				}					
				else
				{
					return {branch : tree, index : i };
				}

			}
			
		}
		return {branch : tree, index : i };
	},

	RenderElement : function(element)
	{
		var comment = element.data;
		var comment_time = (new Date(comment.timestamp)).toLocaleTimeString();
		var comment_date = (new Date(comment.timestamp)).toLocaleDateString();
		return (

			<Row>
				<Comment author={comment.author}  time={comment_time} date={comment_date}
								userimage={comment.userimage} visible={comment.visible} username={comment.username} onCommentSubmit={comment.onCommentSubmit} depth={comment.depth} messageno={comment.messageno} child={element.child} RenderElement={this.RenderElement}>
								{comment.text}
				</Comment>
			</Row>
		);

	},

	render: function() 
	{
			var commentNodes = this.buildTree(this.props.data,0).branch;		
			var commentTree = commentNodes.map(this.RenderElement);
			//var commentTree = this.props.data.map(this.RenderElement);			
			return (
				<div className="commentList">
					<Grid fluid="true">
						<Row>
							<Col xs={1} md={1} />
							<Col xs={10} md={10} >
								{commentTree}
							</Col>
							<Col xs={1} md={1} />
						</Row>
					</Grid>
				</div>
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
	reloadComments: function()
	{

		var filter = {page: this.props.page};

		$.ajax({
			url: '/messageboard',
			dataType: 'json',
			type: 'POST',	
			data: filter,
			success: function(data){
				this.refreshComments(data, data.length, this.state.page_index);
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
			var m = data[i];
			var visible =this.state.visible;
		
			if (m.messageno.substring(0,3) == "tmp")
			{
				visible = false;
			}

			$.extend(m, { visible : visible, username : this.state.author, onCommentSubmit : this.handleCommentSubmit});
			messages.push(m);
		}
		
		this.setState({number_page : noPages, messages: messages, data : data, comment_size : dataLength, page_index : pageIndex});

	},
	handleCommentSubmit: function(comment)
	{

		var userimage = this.state.userimage;
		var messageList =this.state.data;

		var x = 0;
		var i =0;
		for(i=0;i<messageList.length;i++)
		{
			if(messageList[i].messageno == comment.messageparent)
			{
				x=i+1;
				break;
			}
		}

		messageList.splice.apply(messageList, [x,0].concat({author : comment.author, text : comment.text, timestamp: Date.now(), userimage : userimage, page : this.props.page, messageno :  "tmp" + (messageList.length +1).toString(), depth : comment.depth}));

		this.refreshComments(messageList, messageList.length, this.state.page_index);
	
		$.extend(comment, { page : this.props.page});

		$.ajax({
			url: "/data",
			dataType: 'json',
			type: 'POST',
			data: comment,
			success: function(response){
				this.reloadComments();
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
					</Col>
					<Col xs={1} md={1} />
				</Row>
				<Row>
					<Col xs={1} md={1} /> 
					<Col xs={1} md={1}> 
						<CommentWindow username={this.props.username} onCommentSubmit={this.handleCommentSubmit} visible={this.state.visible} label="Post" depth={0}/> 
					</Col>
					<Col xs={1} md={1}> 
						<Button bsStyle="link" bsSize="small" onClick={this.reloadComments} > Refresh </Button>	
					</Col>
					<Col xs={9} md={9} />
				</Row>
				</Grid>
				<CommentList data={this.state.messages} />
				<Grid fluid="true">
				<Row>
					<Col xs={1} md={1} /> 
					<Col xs={1} md={1}> 
						<CommentWindow username={this.props.username} onCommentSubmit={this.handleCommentSubmit} visible={this.state.visible} label="Post" depth={0}/> 
					</Col>
					<Col xs={1} md={1}> 
						<Button bsStyle="link" bsSize="small" onClick={this.reloadComments} > Refresh </Button>	
					</Col>
					<Col xs={9} md={9} />
				</Row>
			</Grid>
			<Pagination bsSize="medium" items={this.state.number_page} activePage={this.state.page_index} onSelect=	{this.handlePaginationSelect} />

			</div>
		);
	}
});

export default CommentBox;

