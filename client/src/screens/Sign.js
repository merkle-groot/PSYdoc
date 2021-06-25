import React, { useState, useEffect } from 'react';
import keccak256 from 'keccak256';
import { Button, Jumbotron, Table, Spinner, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import Web3 from "web3";
import ERC721Contract from "../contracts/NFTokenMetadataDoc.json"; 
import "../screens-styling/Sign.css";
  
const Sign = (props) => {
	let netId;
    const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
  	const [hashedFile, setHashedFile] = useState('');
	const [disabled, setDisabled] = useState(true);
    const [inputID, setInputID] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [web3, setWeb3] = useState(null);
	const [contract, setContract] = useState(null);
	const [address, setAddress] = useState(null);
    const [tokenHash, setTokenHash] = useState('');
    const [isSame, setIsSame] = useState(null);
	const [networkID, setNetworkID] = useState('1337');


	useEffect(()=>{
		// setIsLoading(true);
		async function initWeb3(){
			let web3Instance = await getWeb3();
			let addressTemp = await getUserAccount(web3Instance);
			await getContract(web3Instance, addressTemp, netId);
		}
		initWeb3();
		setIsLoading(false);
	},[])

	const getWeb3 = async () => {
		var instance;
		if (window.ethereum) {
		  // set up a new provider
			try {
				instance = new Web3(window.ethereum);
			} catch (error) {
				console.error(error);
			}
		} else if (window.web3) {
		  	instance = new Web3(window.web3);
		} else {
			// fallback on localhost provider
			alert("Please install Metamask to use the app!");
			const provider = new Web3.provider.HttpProvider("http://127.0.0.1:8545");
			instance = new Web3(provider);
		}
		setWeb3(instance);
		netId = await instance.eth.net.getId()
		setNetworkID(netId);
		console.log(netId);

		return instance;
	}

	// get user account on button click
	const getUserAccount = async (web3Instance) => {
		console.log(1,"getUser");
		let userAddress;
		if (window.ethereum) {
			try {
				await window.ethereum.enable();
				let accounts = await web3Instance.eth.getAccounts();
				userAddress = await accounts[0];
				console.log(accounts);
				setAddress(accounts[0]);
				console.log(2,"getUser");
			} catch (error) {
				console.error(error);
			}
		} else {
			alert("Metamask extensions not detected!");
		}

		console.log(3,"getUser",userAddress);
		return userAddress;
	};

	const getContract = async (web3Instance,addressTemp) =>{
		const contractInstance = new web3Instance.eth.Contract(ERC721Contract.abi,ERC721Contract.networks[netId]["address"]); 
		setContract(contractInstance);
	}

    const goBack = () => {
		props.setMintFlow();
		props.beforeScreen();
	}


    const getBase64 = file => {
		return new Promise(resolve => {
		let fileInfo;
		let baseURL = "";
		// Make new FileReader
		let reader = new FileReader();

		// Convert the file to base64 text
		reader.readAsDataURL(file);

		// on reader load somthing...
		reader.onload = () => {
			// Make a fileInfo Object
			console.log("Called", reader);
			baseURL = reader.result;
			console.log(baseURL);
			resolve(baseURL);
		};
		console.log(fileInfo);
		});
	};

	const changeHandler = e => {
		setIsLoading(true);
		console.log(e.target.files[0]);

		let file = e.target.files[0];

		getBase64(file)
		.then(result => {
			file["base64"] = result;
			console.log("File Is", file);
			setSelectedFile(file)
			let hash = keccak256(result).toString('hex');
			setHashedFile(hash);
			setIsSelected(true);
			setDisabled(false);
		})
		.catch(err => {
			console.log(err);
		});

		setIsLoading(false);
  	};

    const verifySign= async(e)=>{
		e.preventDefault();
		setIsLoading(true);
		try{
			if(inputID === null || hashedFile === ''){
				setIsLoading(false);
				alert("Invalid Input");
				return;
			}
			const res = await contract.methods.tokenURI(inputID).call();
			setTokenHash(res);  

			if(res === hashedFile){
				setIsSame(true);
				setDisabled(false);
			} else {
				setIsSame(false);
				setDisabled(true);
			}
			console.log(res);
		} catch(e){
			console.error(e);
		}
		setIsLoading(false);
    }

    const handleSubmission = async() => {
        try{
			setIsLoading(true);
            const invitees = await contract.methods.returnInvitees(inputID).call();
		    console.log(invitees);

		    let index = invitees.indexOf(address);
            console.log(index)
            const res = await contract.methods.sign(inputID, index).send({
                from: address
            });
			setIsLoading(false);
			props.nextScreen();
            
        } catch{
            alert("You haven't been invited to sign the document.");
			setIsLoading(false);
            // console.error(error);
        }
		
    }

	if(isLoading){
		return(
			<div className="dashboard">
				<div className="card-doc loader">
					<h3>Loading...</h3>
					<Spinner style={{ width: '3rem', height: '3rem' }} />
				</div>
			</div>
		);
	}

	else {
		return (
			<div className="card-docSign">
				<div className="docHeadingSign">
					<Jumbotron>
						<h1 className="display-3">SIGN THE DOC!</h1>
						<p className="lead">Verify that the hash of the document matches with your copy of the document.</p>
						<hr className="my-2" />
					</Jumbotron>
				</div>

				<div className="uploadAreaSign">
					<Form onSubmit={(e)=>verifySign(e)}>
						<FormGroup>
							<Label for="TokenId">Token ID</Label>
							<Input type="number" min="1" value={inputID} onChange={(e)=>setInputID(e.target.value)} name="tokenId" id="TokenId" placeholder="with a placeholder" />
						</FormGroup>
						<FormGroup className="inputForm">
							<Label for="exampleFile">File</Label>
							<Input type="file" onChange={changeHandler}/>
							<FormText color="muted">
								This is some placeholder block-level help text for the above input.
								It's a bit lighter and easily wraps to a new line.
							</FormText>
						</FormGroup>
						<FormGroup>
							<Button className="verifySign" onClick={(e)=>{verifySign(e)}}>Verify</Button>
						</FormGroup>              
					</Form>
					
				</div>
				
				<div className ="uploadDeetsAreaSign">
					<div className="hashes">
						<Table hover>
							<tbody>
								<tr>
									<td>Minted Token's Hash:</td>
									<td>{tokenHash}</td>
								</tr>
								<tr>
									<td>Your Document's Hash:</td>
									<td>{tokenHash?hashedFile:""}</td>
								</tr>
								<tr>
									<td>Result:</td>
									<td>{tokenHash?(isSame?('Perfect Match!'):("Hashes don't match")):("Upload the file and click on Verify.")}</td>
									{/* <td>{isSame? ("Perfect Match!"):("Hashes dont match")}</td> */}
								</tr>
							</tbody>
						</Table>
					</div>
				</div>

				<div className="buttonArea">
					<Button outline  size="lg"  color="primary" className="docButtons" onClick={()=> goBack()}>Previous</Button>
					<Button outline  size="lg" color="primary" className="docButtons" disabled={disabled} onClick={()=>handleSubmission()}>Sign It!</Button>
				</div>
			</div>
		);
	}
};
  
export default Sign;