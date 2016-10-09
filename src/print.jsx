import React from 'react';
import Button from 'react-bootstrap/lib/Button';



class Print extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: 'Initial input value'};
		this.updateValue = this.updateValue.bind(this);
	}
	updateValue(event){
		this.setState({value: event.target.value});
	}
	render(){
		return (
			<div> Hello webpack! <input type="text"  onChange={this.updateValue} value={this.state.value}/><p>{this.state.value}</p><Button /></div>
		);
	}
};

export default Print;
