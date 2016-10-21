import React from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel  from 'react-bootstrap/lib/ControlLabel';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';


var CommentWindow = React.createClass({
	getInitialState: function() {
		return {commentText: '', submitDisable : true, showModal : false};
	},
	reset: function() {
		this.setState({commentText: "", submitDisable : true});
	},
	handleTextChange: function(e){
		
		var text = e.target.value;
		var isDisabled = false;
	
		if (text.length == 0) 
		{
			isDisabled = true;
		}
	
		this.setState({commentText: text,  submitDisable : isDisabled});

	},
	close : function(e)
	{
		this.setState({showModal : false});
	},
	show : function(e)
	{
		this.setState({showModal : true});
	},
	handleSubmit: function(e){
		e.preventDefault();
		var text = this.state.commentText.trim();
		var author = this.props.username;
		var depth = 0;
		if (this.props.label=="Reply")
		{
			depth = parseInt(this.props.depth) + 1;
		}
		if ( !text){
			return;
		}
		this.props.onCommentSubmit({author: author, text: text, depth : depth, messageparent : this.props.messageparent});
		this.setState({commentText:"", showModal : false});
		location.hash = "#top"
	},
	render: function() {
		return (

			<div>
			<Button disabled={!this.props.visible} bsStyle="link" bsSize="small" onClick={this.show} > {this.props.label} </Button>	
			<Modal show={this.state.showModal} onHide={this.close}>
				<Modal.Header closeButton>
					<Modal.Title>Comment</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<form>
					<FormGroup>
						<ControlLabel>Comment</ControlLabel>
							<FormControl type="textarea" placeholder="Type something..." value={this.state.commentText} onChange={this.handleTextChange}/>
					</FormGroup>
				</form>
				</Modal.Body>
				<Modal.Footer>
						<Button  disabled={this.state.submitDisable}  onClick={this.reset} bsStyle="default">Reset</Button>
						<Button  disabled={this.state.submitDisable}  onClick={this.handleSubmit} bsStyle="default">Submit</Button>
						<Button onClick={this.close}>Cancel</Button>						
				</Modal.Footer>
			</Modal>
			</div>

		);
	}
});

export default CommentWindow;


