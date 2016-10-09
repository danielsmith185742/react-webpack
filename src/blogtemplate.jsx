import React from 'react';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import BlogHeader from './blogheader.jsx';	
import BlogCaption from './blogcaption.jsx';
import BlogImageRightCaption from './blogimagerightcaption.jsx';	
import BlogImageLeftCaption from './blogimageleftcaption.jsx';	

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var BlogTemplate = React.createClass({
	
	render:function(){
		return (
			<div />
	)}
});

BlogTemplate = _Object$assign(BlogTemplate, { Header: BlogHeader, Caption: BlogCaption, ImageRightCaption: BlogImageRightCaption, ImageLeftCaption: BlogImageLeftCaption });

export default BlogTemplate;



