import React ,{useState} from 'react'
import ImageUpload from './ImageUpload'
import ImagePreview from './ImagePreview'
import {enhancedImageAPI} from '../utils/imageenhancer' 
function Home() {
    const [uploadImage, setuploadImage] = useState();
     const [enhanceImage, setenhanceImage] = useState();
     const [loading,setloading]=useState(false);
     const uploadImageHandler = async(file)=>{
        setuploadImage(URL.createObjectURL(file));
        setloading(true);
        try {
            const enhancedurl = await enhancedImageAPI(file);
            setenhanceImage(enhancedurl);
            setloading(false);
        } catch (error) {
            console.log('some error occured',error);
            alert("Error occured while enhancing image");
            setloading(false);
        }
     }
  return (
    <>
        <ImageUpload uploadImageHandler={uploadImageHandler} />
        <ImagePreview loading={loading} uploaded={uploadImage} enhanced={enhanceImage}/>
   </>
   )
}

export default Home;