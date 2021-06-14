import React, { useState } from 'react';
import keccak256 from 'keccak256'
import './App.css';

function Doc() {
  const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
  const [hashedFile, setHashedFile] = useState('');


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
      })
      .catch(err => {
        console.log(err);
      });
  };

	// const changeHandler = async(event) => {
	// 	setSelectedFile(event.target.files[0]);
	// 	setIsSelected(true);

  //     let fileInfo;
  //     let baseURL;
  //     // Make new FileReader
  //     let reader = new FileReader();

  //     // Convert the file to base64 text
  //     await reader.readAsDataURL(event.target.files[0]);

  //     // on reader load somthing...
  //     await reader.onload = () => {
  //       // Make a fileInfo Object
  //       // console.log("Called", reader);
  //       baseURL = reader.result;
  //       // console.log(baseURL);
  //     };
  //     console.log(fileInfo);

  //     let k256 = await keccak256(baseURL).toString('hex');
  //     await setHashedFile(k256);
  //     console.log(k256)
  //   }

	const handleSubmission = () => {
	};

  return (
    <div className="App">
      <input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
          <p>Hashed value: {hashedFile}</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
    </div>
  );
}

export default Doc;
