import React from 'react';
import { Jumbotron,ListGroup, ListGroupItem, Button} from 'reactstrap';
import "../Pages-Styling/About.css";
import {Link} from 'react-router-dom';
import image from "../images/dumb.gif";

  
const About = () => {
  return (
    <div className="aboutContainer">
        <div className="card-docAbout">
			<div className="docHeadingAbout">
				<Jumbotron>
					<h1 className="display-3">How does this work?</h1>
					<hr className="my-2" />
				</Jumbotron>
			</div>

			<div className="bulletImage">
				
				<ListGroup>
					<ListGroupItem>1. When you select a file, a hash of the contents is calculated locally and stored in your browser</ListGroupItem>
					<ListGroupItem>2. Browser interacts with PSYdoc's smart-contracts to mint an NFT with the hash constituting as the URI of the NFT.</ListGroupItem>
					<ListGroupItem>3. You can get people to sign your NFT, by first inviting them on 'Your Docs' screen.</ListGroupItem>
				</ListGroup>
			</div>

			<div className="aboutText">
				<div className="text">
					<h5>
						<span id="bold">That's right! Your file doesn't leave your device which makes it perfect for signing confidential documents.</span> 
						{/* Only the hashed value is sent to Ethereum network, which can't be reversed to get the original file. */}
					</h5>
				</div>
				<div className="imageLinks">
					{/* <div className="iamgeArea"> */}
						<img src={image} className="gifImage" alt="gif"/>
						<Button outline size="lg"  className="button-block">
							<Link to ="/">Get Started!</Link>
						</Button>
					{/* </div> */}
				</div>
			</div>
		</div>
	</div>
 	);
};
  
export default About;