import React from "react";

function ImageUpload(props) {
    const showimagehandler = (e)=>{
       const file =  e.target.files[0];
        if(file){
            props.uploadImageHandler(file);
        }
    }
  return (
    <div className="bg-white text-black-500 shadow-lg rounded-2xl p-6 w-full max-w-2xl">
      <label
        htmlFor="fileInput"
        className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500">
        <input type="file" id="fileInput" className="hidden" onChange={showimagehandler}/>
        <span className="text-lg font-medium text-gray-600">Click and drag to upload your image</span>
      </label>
      
    </div>
  );
}

export default ImageUpload;
