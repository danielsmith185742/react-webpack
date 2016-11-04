import React from 'react';
import ReactDOM from 'react-dom';
import NavbarInstance from './header.jsx';	
import Footer from './footer.jsx';	
import BlogTemplate from './blogtemplate.jsx';	
import CommentBox from './commentboard.jsx';	
import './css/bootstrap.min.css';
import './css/garage.css';

class BlogPage extends React.Component {

	constructor(props) {
		super(props);
			
	}	

	render() {

		return (
			<div>
				<NavbarInstance />
				<BlogTemplate.Header title="Getting started with VHDL and FPGA" datestamp="2016-01-01" />
				<BlogTemplate.Caption title="">
						<p>After recently reading an article on how Microsoft is <a href="http://www.nextplatform.com/2015/08/27/microsoft-extends-fpga-reach-from-bing-to-deep-learning/">extending FPGA usage to Deep Learning applications</a> I decided it was about time I learnt a little bit more about FPGAs. It seems that Microsoft has been researching the use of FPGAs as an alternative to GPUs for machine learning applications and <a href="http://research.microsoft.com/pubs/240715/CNN%20Whitepaper.pdf">released a white paper</a> in February 2015.
						</p>
						<p>							
						If you are new to FPGAs and want a high level explanation of how they work, then there is an excellent video by Dave Jones on YouTube that is worth checking out.
						</p>
				</BlogTemplate.Caption>

				<center>
				<iframe width="560" height="315" src="https://www.youtube.com/embed/gUsHwi4M4xE" frameborder="0" allowfullscreen></iframe>
				<br />
				<p>Also by Dave Jones is a video explaining JTAG that is worth watching.</p>
				</center>

				<center>
				<iframe width="560" height="315" src="https://www.youtube.com/embed/TlWlLeC5BUs" frameborder="0" allowfullscreen></iframe>
				</center>
				<br />	
				<BlogTemplate.ImageRightCaption title="BASYS2 development board" image="img/basys2-package.jpg" height="267" width="213" align="bottom">

					<p>Rather than just getting a theoretical understanding of FPGAs, I decided I wanted to get some hands on experience of programming a FPGA using VDHL. I headed over to one of my local electronics stores, <a href="http://akizukidenshi.com"> AkizukiDenshi</a> in Akihabara to see what I could find. They had various different FPGA, development boards to choose from, since my purpose was to learn more about VHDL, I was looking for a board that was relatively simple to get started with and which was reasonably priced. In the end I selected the BASYS2 board by Digilient, selling for ￥11,600 (roughly $95).</p>
					<p>The BASYS2 board comes without any software, the necessary software required for creating VHDL designs and programming the board needs to be downloaded.
					</p>

				</BlogTemplate.ImageRightCaption>

				<BlogTemplate.ImageLeftCaption title="" image="img/basys2-board.jpg" height="183" width="320"  align="middle">

					<p> The <a href="https://reference.digilentinc.com/basys2:basys2">BASYS2</a> board hosts a Xilinx Spartan 3E-100 FPGA with an effective gate count of 100,000 and is programmable via a USB2 interface. The BASYS2 board also has various onboard buttons, switches and LEDs. As well as four 6-pin ports, a PS/2 port and an 8 bit VGA port. </p>

				</BlogTemplate.ImageLeftCaption>

				<BlogTemplate.Caption title="BASYS2 development environment">

					<p>
					Xilinx provide a free software suite called the ISE WebPack that can be downloaded <a href="http://www.xilinx.com/products/design-tools/ise-design-suite/ise-webpack.html">here</a>. The ISE WebPack includes software that can be used to define VHDL, Verilog or schematic-based circuits. It can also simulate and synthesize designs and create device programming files.
					</p>
					<p>
					In order to install the ISE Webpack, multiple files needed to be downloaded and it took quite some time to download them all and run the set-up program. I also made the mistake of attempting to install the ISE Webpack on my Windows 8 PC, unfortunately Xilinx only support this software for Windows 7 and the application kept crashing. After scouring the web for a solution I did find various discussion groups with proposed solutions to run WebPack on Windows 8 but in the end I decided the simplest thing would be to install the sofware on an old Windows 7 PC that I have set-up as dual boot and normally use for running Ubuntu. After installing ISE WebPack on Windows 7 there were no further issues. (Its seems that Xilinx may be phasing out the Spartan 3E series, their newer design suite Vivado supports newer operating systems such as Windows 8 but unfortunately doesn't support the Spartan 3E chip series). 
					</p>
					<p>
					In order to upload the device programming files to the BASYS2 you also need to download the <a href="http://www.digilentinc.com/Products/Detail.cfm?NavPath=2,66,828&Prod=ADEPT2">Digilent Adept</a> application which is also free.
					</p>

				</BlogTemplate.Caption>

				<BlogTemplate.Caption title="Programming the BASYS2 board">

					<p>
					<a href="https://en.wikipedia.org/wiki/VHDL">VHDL (VHSIC Hardware Description Language)</a> is a hardware description language used in electronic design automation to describe digital and mixed-signal systems such as FPGAs and integrated circuits. There are numerous VHDL tutorials on the web and this <a href="http://www.seas.upenn.edu/~ese171/vhdl/vhdl_primer.html">VHDL tutorial</a> seems like a reasonable guide for a beginner.
					</p>
					<p>
					I also found a great step-by-step guide on YouTube by Thomas Jespersen that walks you through the basic steps of writing a simple VHDL counter application, synthesizing the design and building the device programming files, all using the Xilinx ISE Webpack. It also demonstrates how to upload the programming files to the BASYS2 board using the Digilent Adept programmer.  
					</p>

				</BlogTemplate.Caption>

				<center>
				<iframe width="560" height="315" src="https://www.youtube.com/embed/Ob7B6x5g6tw" frameborder="0" allowfullscreen></iframe>	
				<br />					
				<a href="http://www.binaryhexconverter.com/decimal-to-binary-converter"> Handy Decimal to Binary converter</a> 
				</center>
				<br />	
				<BlogTemplate.Caption title="Conclusion">

					<p>
					For a more indepth tutorial, check out this <a href="http://papilio.cc/uploads/Papilio/IntroToSpartanFPGABook.pdf">introduction to the Spartan 3E and VHDL</a> by Mike Field.
					The Spartan 3E with an effective gate count of only 100,000 is unlikley to prove useful in any deep learning application but if the goal is familiarizing one's self with VHDL and FPGAs it doesn't seem like a bad place to start. Now that I can write a simple program, the next step is to get more familiar with the VHDL language and try and create some complex designs, for example I intend to try designing some signal processing circuits and see how far I can push the limits of the Spartan 3E. 
					</p>

				</BlogTemplate.Caption>
			<CommentBox page="blog001" title="Comments" />
			<Footer />
			</div>
			);
	}
}

ReactDOM.render(<BlogPage />, document.getElementsByClassName('application')[0]);


