import React from 'react';
import {Jumbotron, Button } from 'reactstrap';
import celebrate from "../images/success.gif";
import "../screens-styling/Doc.css";
  
const Success = (props) => {
  	return (
		<div className="card-doc"> 
			<div className="docHeading">
				<Jumbotron>
					<h1 className="display-3">There we go!</h1>
					<p className="lead">Your document has been minted as an NFT!</p>
					<hr className="my-2" />
				</Jumbotron>
			</div>

			<div className ="uploadDeetsArea-success">
				<img src={celebrate} className="success-gif"/>
			</div>

			<div className="uploadArea-success">
				<h4>You can now invite people to sign your document</h4>
				<Button outline size="lg" color="success" className="docButtons">Invite!</Button>
			</div>
				
			

			<div className="buttonArea">
				<Button outline  size="lg" color="primary" className="docButtons" onClick={()=> props.beforeScreen()}>Before</Button>
			</div>
		
		</div>
  	);
};
  
export default Success;