import React from 'react';
import psy from '../images/psydoc1.png';
import "../screens-styling/Steps.css";
import { Button, Jumbotron } from 'reactstrap';
  
const Steps = (props) => {

	const goToSign = () => {
		props.resetMintFlow();
		props.nextScreen();
	}




  	return (
    	<div className="card">
			<div className="leftText">

				<div className="mintHeading">
					<Jumbotron>
						<h1 className="display-3">MINT A DOC</h1>
						<p className="lead">Use this option if you haven't minted your document as an NFT yet. You can invite signees after it's minted.</p>
						<hr className="my-2" />
						<Button  outline className="button-block" color="primary" size="lg" block onClick={()=> props.nextScreen()}>Mint</Button>
					</Jumbotron>
				</div>

				<div className="or">
					<div>(OR)</div>
				</div>

				<div className="signHeading">
					<Jumbotron>
						<h1 className="display-3">SIGN A DOC</h1>
						<p className="lead">Use this option if you have been invited to sign a document. You can verify the document you are signing by comparing the hashes. </p>
						<hr className="my-2" />
						<Button  outline className="button-block" color="primary" size="lg" block onClick={()=> goToSign()}>Sign</Button>
					</Jumbotron>
				</div>
				
			</div>
			<div className="rightImage">
				<img className="psy-image" src={psy} alt="logo" /> 
			</div>

      		{/* <button onCl1ick={()=> props.nextScreen()}>Next</button> */}
    	</div>
  );
};
  
export default Steps;