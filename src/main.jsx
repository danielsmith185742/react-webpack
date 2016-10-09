import React from 'react';
import Carousel from 'react-bootstrap/lib/Carousel';

var CarouselInstance = React.createClass({
	render:function(){
		return (
			<div>
			<center>
			<Carousel>
				<Carousel.Item>
					<img width={900} height={500} alt="900x500" src="img/start.jpg"/>
					<Carousel.Caption>
						<h3>Welcome</h3>
						<p>Garage Machine Learning.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img width={900} height={500} alt="900x500" src="img/basys2-board.jpg"/>
					<Carousel.Caption>
						<h3>Welcome</h3>
						<p>Garage Machine Learning.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img width={900} height={500} alt="900x500" src="img/jetson-small.jpg"/>
					<Carousel.Caption>
						<h3>Welcome</h3>
						<p>Garage Machine Learning.</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
			</center>
			</div>
		);
	}
});

export default CarouselInstance;
