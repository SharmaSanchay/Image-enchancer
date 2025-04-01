import React from "react";
import Loading from "./Loading";
function ImagePreview(props) {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-600 max-w-4xl">
      {/*upload image*/}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <h2 classame="text-xl font-semibold text-center bg-gray-800  text-white py-2">
          orginal image
        </h2>
        {props.uploaded ? (
          <img
            src={props.uploaded}
            alt="no image"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-80 bg-gray-200">
            no image selected
          </div>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        <h2 classame="text-xl font-semibold text-center bg-blue-800  text-white py-2">
          enhanced image
        </h2>
        {props.enhanced && !props.loading && (
          <img src={props.enhanced} alt="" className="w-full h-full object-cover" />)
        }
        {props.loading ? (<Loading/>):( <div className="flex items-center justify-center h-80 bg-gray-200">no enhanced image</div>)}
       
      </div>
    </div>
  );
}

export default ImagePreview;
