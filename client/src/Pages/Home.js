import React,{useEffect,useState} from 'react';
import Web3 from 'web3';
import "../Pages-Styling/Home.css";

function Home(){
    let web3 = new Web3("http://127.0.0.1:8545");
    web3.eth.getAccounts().then(console.log);
    return(
    
        <div className="dashboard">
			<div className="card">
			</div>
        </div>
    )
}

export default Home;