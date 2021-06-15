import React from 'react';

  
const Sign = (props) => {
    const goBack = () => {
		props.setMintFlow();
		props.beforeScreen();
	}

    return (
        <div className="card">
        <h1>Sign</h1>
        <button onClick={()=> goBack()}>Before</button>
        <button onClick={()=> props.nextScreen()}>Next</button>
        </div>
    );
};
  
export default Sign;