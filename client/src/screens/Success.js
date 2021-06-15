import React from 'react';
  
const Success = (props) => {
  return (
    <div className="card"> 
      <h1>Success</h1>
      <button onClick={()=> props.beforeScreen()}>Before</button>
    </div>
  );
};
  
export default Success;