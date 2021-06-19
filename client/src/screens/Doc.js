import React,{ useState, useEffect } from 'react';
import { useStoreApi } from "../context/storeApi";
import useWeb3 from "../context/useWeb3";
import keccak256 from 'keccak256'
import "../screens-styling/Doc.css";
import { Button, Jumbotron, Table, Spinner } from 'reactstrap';
import ERC721Contract from "../contracts/NFTokenMetadataDoc.json"; 

  
const Doc = (props) => {
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
  	const [hashedFile, setHashedFile] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const { balance, address, message, setAddress, setBalance } = useStoreApi();
  	const web3 = useWeb3();

	useEffect(()=>{
		getUserAccount();
	})

	// get user account on button click
	const getUserAccount = async () => {
		if (window.ethereum) {
			try {
				await window.ethereum.enable();
				web3.eth.getAccounts()
					.then(accounts => {
						setAddress(accounts[0]);
						updateBalance(accounts[0]);
					});
			} catch (error) {
				console.error(error);
			}
		} else {
		alert("Metamask extensions not detected!");
		}
	};

	const updateBalance = async fromAddress => {
		await web3.eth.getBalance(fromAddress).then(value => {
		setBalance(web3.utils.fromWei(value, "ether"));
		});
	};

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
  	};

	const handleSubmission = async() => {
		try{
			setIsLoading(true);
			console.log(ERC721Contract.networks[1337]["address"]);
			const contract = new web3.eth.Contract(ERC721Contract.abi,ERC721Contract.networks[1337]["address"]); 
			// console.log(contract.events)
			// console.log(contract);
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
			alert("Looks like the transaction failed :(\n Make sure you are using Metamask with test ethers.")
		}
		setIsLoading(false);
	}

	if(isLoading){
		return (
			<div className="card-doc loader">
				<Spinner style={{ width: '3rem', height: '3rem' }} />
			</div>
		)
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
			</div>
		);
	}
};
  
export default Doc;