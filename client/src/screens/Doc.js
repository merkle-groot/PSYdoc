import React,{ useState } from 'react';
import keccak256 from 'keccak256'
import "../screens-styling/Doc.css";
import { Button,Input, Jumbotron, Table } from 'reactstrap';

  
const Doc = (props) => {
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
  	const [hashedFile, setHashedFile] = useState('');
	const [disabled, setDisabled] = useState(true);
	const contract = props.contract;
	const web3 = props.web3;
	console.log(contract);

	
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
		
		const accounts = await web3.eth.getAccounts();
		const account = await accounts[0]; 
		console.log(account);
		const res = await contract.methods.mint(account, 1, hashedFile).send(
			{
				from: account
			}
		)
		console.log(res);
		// props.nextScreen()
	}

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
};
  
export default Doc;