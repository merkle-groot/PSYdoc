import React,{ useState, useEffect } from 'react';
import keccak256 from 'keccak256'
import "../screens-styling/Doc.css";
import { Button, Jumbotron, Table, Spinner, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ERC721Contract from "../contracts/NFTokenMetadataDoc.json"; 
import Web3 from "web3";

  
const Doc = (props) => {
	let netId;
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
  	const [hashedFile, setHashedFile] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [web3, setWeb3] = useState(null);
	const [address, setAddress] = useState(null);
	const [contract, setContract] = useState(null);
	const [networkID, setNetworkID] = useState('1337');
	const [modal, setModal] = useState(false);
	const [modalHeader, setModalHeader] = useState('Metamask Required');
	const [modalBody, setModalBody] = useState('This dApp requires Metamask to interact with Ethereum blockchain. Please consider installing Metamask extension on your browser. :)')

	const modalToggle = () => setModal(!modal);

  
	useEffect(()=>{
		async function initWeb3(){
			let web3Instance = await getWeb3();
			let addressTemp = await getUserAccount(web3Instance);
			await getData(web3Instance, addressTemp, netId);
			setIsLoading(false);
		}
		initWeb3();
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
			modalToggle();
			return;
		}
		setWeb3(instance);
		netId = await instance.eth.net.getId()
		setNetworkID(netId);
		console.log(netId);

		return instance;
	}

	// get user account on button click
	const getUserAccount = async (web3Instance) => {
		let userAddress;
		if (window.ethereum) {
			try {
				await window.ethereum.enable();
				let accounts = await web3Instance.eth.getAccounts();
				userAddress = await accounts[0];
				setAddress(accounts[0]);
			} catch (error) {
				console.error(error);
			}
		} else {
			return;
		}
		return userAddress;
	};

	const getData = async (web3Instance,addressTemp, netId) =>{
		try{
			// await getUserAccount();
			console.log(ERC721Contract.networks[netId]["address"]);
			console.log(addressTemp);
			const contractInstance = new web3Instance.eth.Contract(ERC721Contract.abi,ERC721Contract.networks[netId]["address"]); 
			setContract(contractInstance);
		} catch(e){
			console.error(e);
		}
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
			baseURL = reader.result;
			console.log(baseURL);
			resolve(baseURL);
		};
		console.log(fileInfo);
		});
	};

	const changeHandler = e => {
		console.log(e.target.files[0]);

		let file = e.target.files[0];

		getBase64(file)
		.then(result => {
			file["base64"] = result;
			setSelectedFile(file)
			let hash = keccak256(result).toString('hex');
			setHashedFile(hash);
			setIsSelected(true);
			setDisabled(false);
		})
		.catch(err => {
			console.log(err);
		});
  	};

	const handleSubmission = async() => {
		setIsLoading(true);
		try{
			console.log(ERC721Contract.networks[networkID]["address"]);
			console.log(networkID);
			const res = await contract.methods.mint(address, hashedFile).send(
				{
					from: address
				}
				
			) 
			console.log(res);
			console.log(res.events["Transfer"]["returnValues"][2]);
			console.log(res.events["Transfer"]["returnValues"]["2"]);
			props.nextScreen();
		}
		catch{
			setModalHeader('Transaction Failed :(');
			setModalBody('Make sure you have test Ethers in you wallet and you are on the right network.');
			modalToggle();
			setIsLoading(false);
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

	else{
		return (
			<div className="card-doc">
				<div className="docHeading">
					<Jumbotron>
						<h1 className="display-3">GET THE HASH!</h1>
						<p className="lead">Select your document that needs to be minted.</p>
						<hr className="my-2" />
					</Jumbotron>
				</div>

				<div className="uploadArea">
					<input type="file" name="file" onChange={changeHandler}/>
				</div>
				
				<div className ="uploadDeetsArea">

					{isSelected ? (
						<Table hover>
							<tbody>
								<tr>
									<td>File Name</td>
									<td>{selectedFile.name}</td>
								</tr>
								<tr>
									<td>File Type</td>
									<td>{selectedFile.type}</td>
								</tr>
								<tr>
									<td>Size in byters</td>
									<td>{selectedFile.size}</td>
								</tr>
								<tr>
									<td>lastModifiedDate</td>
									<td>{' '}{selectedFile.lastModifiedDate.toLocaleDateString()}</td>
								</tr>
								<tr>
									<td>Hashed Value</td>
									<td> {hashedFile}</td>
								</tr>
							</tbody>
						</Table>) : 
					(
						<p>Select a file to show details</p>
					)}
				</div>

				<div className="buttonArea">
					<Button outline  size="lg"  color="primary" className="docButtons" onClick={()=> props.beforeScreen()}>Previous</Button>
					<Button outline  size="lg" color="primary" className="docButtons" onClick={()=> handleSubmission()} disabled={disabled}>Submit</Button>
				</div>
				<div>
					<Modal isOpen={modal} toggle={modalToggle}>
						<ModalHeader toggle={modalToggle}>{modalHeader}</ModalHeader>
						<ModalBody>
							{modalBody}
						</ModalBody>
						<ModalFooter>
						<Button color="primary" onClick={modalToggle}>Close</Button>
						</ModalFooter>
					</Modal>
				</div>
			</div>
		);
	}
};
  
export default Doc;