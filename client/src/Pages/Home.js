import React,{useState} from 'react';
import Steps from '../screens/Steps';
import Doc from '../screens/Doc';
import Success from '../screens/Success';
import SuccessSign from '../screens/SuccessSign';
import Sign from '../screens/Sign';
import "../Pages-Styling/Home.css";


function Home(){
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
                <Doc beforeScreen={beforeScreen} nextScreen={nextScreen} setMintFlow={setMintFlow}/>
            </div>
        )
    else if(currentScreen === 2 && ifMintFlow === 0)
        return(
            <div className="dashboard">
                <Sign beforeScreen={beforeScreen} nextScreen={nextScreen} setMintFlow={setMintFlow}/>
            </div>
        )

    else if(currentScreen === 3 && ifMintFlow === 0)
        return(
            <div className="dashboard">
                <SuccessSign beforeScreen={beforeScreen}/>
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