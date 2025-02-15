// Contoh Pemakaian:
// <Component.DropZone validTypes={['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon']}/>
// MIME types:
/*  
  https://slick.pl/kb/htaccess/complete-list-mime-types/
*/

import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import BackendRoutes from '../routes/backendRoutes';

const DropZone = ({validTypes, buttonText, postURL, idName, filesLimit, user, refresh, context, memberID, setVerdict, setFlashMessageTime, setHideDropzone, maxFileSize}) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [requestRunning, setRequestRunning] = useState(false);

  const fileSize = (size) => {
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  const validateFiles = (file) => {
    let validTypesArray = validTypes;
    if (validTypesArray === "all") {
      return true
    }

    if (validTypes.indexOf(file.type) === -1){
      return false;
    }

    if (file.size >= maxFileSize) {
      return false;
    }
    
    return true;
  }

  const handleFiles = (files) => {
    if (files.length + validFiles.length <= (filesLimit || 1)) {
      for (let file of files) {
        if (validateFiles(file)) {
          setSelectedFiles(prevArray => [...prevArray, file]);
        } else {
          file.invalid = true;
          setSelectedFiles(prevArray => [...prevArray, file]);
          setErrorMessage("Sorry, file type not Permitted or file size is too large");
          setUnsupportedFiles(prevArray => [...prevArray, file]);
        }
      }
      setVerdict({message:"", status:""});
      setFlashMessageTime(2000);
    }
    else {
      setVerdict({message: `Sorry, the files limit is ${filesLimit || 1} file(s)`, status:"error"});
      setFlashMessageTime(2000);
    }

  }

  const dragOver = (e) => {
    e.preventDefault();
  }

  const dragEnter = (e) => {
    e.preventDefault();
  }

  const dragLeave = (e) => {
    e.preventDefault();
  }

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  }

  const removeFile = (name) => {
    // find the index of the item
    // remove the item from array
    const validFileIndex = validFiles.findIndex(e => e.name === name);
    validFiles.splice(validFileIndex, 1);
    
    // update validFiles array
    setValidFiles([...validFiles]);
    const selectedFileIndex = selectedFiles.findIndex(e => e.name === name);
    selectedFiles.splice(selectedFileIndex, 1);
    
    // update selectedFiles array
    setSelectedFiles([...selectedFiles]);

    const unsupportedFileIndex = unsupportedFiles.findIndex(e => e.name === name);
    if (unsupportedFileIndex !== -1) {
    unsupportedFiles.splice(unsupportedFileIndex, 1);
    // update unsupportedFiles array
    setUnsupportedFiles([...unsupportedFiles]);
    }
    document.getElementById(`${idName}`).reset();
  }

  const fileInputRef = useRef();

  const fileInputClicked = () => {
    fileInputRef.current.click();
  }

  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  }

  const uploadFiles = (e) => {
    e.preventDefault();

    if (requestRunning) {
      return;
    }

    setRequestRunning(true);
    
    for (let file of validFiles) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('accountID', user?.account?.accountID);
      formData.append('context', context);
      formData.append('memberID', memberID);
      setVerdict({status: "info", message: "Please wait, we are uploading your file (it may take a long time for larger files)"});
      setFlashMessageTime(2000);

      axios.post(
        BackendRoutes.auth,
        {email: user?.account?.email},
        {withCredentials: true}
      ).then(res => {
        return axios.post(
          postURL, 
          formData, 
          {
            withCredentials: true,
            headers: {
              "Authorization" : `Bearer ${res.data.accessToken}`
            }
          }
        )
      })
      .then(
        (res) => {
          setVerdict({status: "success", message: res.data.message});
          setFlashMessageTime(2000);
          setErrorMessage("");
          setSelectedFiles([])
          setValidFiles([]);
          setUnsupportedFiles([]);
          setHideDropzone(true);

          document.getElementById(`${idName}`).reset();
          refresh();

          setRequestRunning(false);
        }
      )
      .catch(
        (e) => {
          setVerdict({status:"error", message: e.response.data.message});
          setFlashMessageTime(2000);
          document.getElementById(`${idName}`).reset();
          setRequestRunning(false);
        }
      )
    }
  }

  useEffect(() => {
    let filteredArray = selectedFiles.reduce((file, current) => {
      const x = file.find(item => item.name === current.name);
      if (!x) {
        return file.concat([current])
      } else {
        return file
      }
    }, [])
    
    setValidFiles([...filteredArray]);

  }, [selectedFiles])

  return (
    <div className="dropzone-container">

      <div className="drop-container"
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        onClick={fileInputClicked}
      >
        <div className="drop-message">
          <FontAwesomeIcon icon={['fas', 'cloud-upload-alt']} size="2x"/>
          <span>Drag & Drop files here or click to upload</span>
        </div>
          <input
            ref={fileInputRef}
            className="file-input"
            type="file"
            onChange={filesSelected}
            multiple={(filesLimit || 1) > 1}
          />
      </div>

      <div className="file-display-container">
        {
          validFiles.map((data, i) =>
            <div className="file-status-bar" key={i}>
              <div className="file-status-text">
                <span className="file-name">{data.name}</span>
                <span className="file-size">{fileSize(data.size)}</span>
                {data.invalid && <span className="file-error-message">{errorMessage}</span>}
              </div>
              <button className="file-remove" onClick={(e) => {e.preventDefault(); removeFile(data.name)}} disabled={requestRunning}>
                <FontAwesomeIcon icon={['fas', 'times-circle']} size="lg"/>
              </button>
            </div>
          ) 
        }

        {
          unsupportedFiles.length === 0 && validFiles.length 
          ? <button className="button-primary-filled" onClick={uploadFiles} disabled={requestRunning}>{buttonText || "UPLOAD FILE"}</button>
          : ''
        }

        {
          unsupportedFiles.length
          ? <div className="flash-message" status="error">Please remove all unsupported files!</div>
          : null
        }
        
      </div>

    </div>
  )
}

export default DropZone