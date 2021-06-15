import React,{useEffect,useState} from 'react';
import Steps from '../screens/Steps';
import Doc from '../screens/Doc';
import Success from '../screens/Success';
import Sign from '../screens/Sign';
import Web3 from 'web3';
import "../Pages-Styling/Home.css";
import ERC721Contract from "../contracts/NFTokenMetadataDoc.json"; 

function Home(){
    let web3 = new Web3("http://127.0.0.1:8545");
    const erc721 = new web3.eth.Contract(ERC721Contract.abi,"0x21511a3A94a8f6407fF11CA10B79B01D8b985967");


    

    const [currentScreen, setCurrentScreen] = useState(1);
    const [ifMintFlow, setIfMintFlow] = useState(1);

    const beforeScreen = () => {
        setCurrentScreen(currentScreen-1);
    }

    const nextScreen = () => {
        setCurrentScreen(currentScreen+1);
    }

    const resetMintFlow = () => {
        setIfMintFlow(0);
    }

    const setMintFlow = () => {
        setIfMintFlow(1);
    }

    if(currentScreen === 1)
        return(
            <div className="dashboard">
                <Steps nextScreen={nextScreen} resetMintFlow={resetMintFlow}/>
            </div>
        )
    else if(currentScreen === 2 && ifMintFlow === 1)
        return(
            <div className="dashboard">
                <Doc beforeScreen={beforeScreen} nextScreen={nextScreen} contract={erc721} web3={web3}/>
            </div>
        )
    else if(currentScreen === 2 && ifMintFlow === 0)
        return(
            <div className="dashboard">
                <Sign beforeScreen={beforeScreen} nextScreen={nextScreen} setMintFlow={setMintFlow}/>
            </div>
        )
    else if(currentScreen === 3)
        return(
            <div className="dashboard">
                <Success beforeScreen={beforeScreen}/>
            </div>
        )
}

export default Home;