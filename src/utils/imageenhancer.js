import axios from 'axios';

export const enhancedImageAPI = async (file) => {
  try {
    console.log("calling the upload image");
    const taskId = await uploadimage(file);
    const enhancedImage = await pollforimage(taskId); // Use polling to ensure the image is ready
    // Auto download the enhanced image
    await downloadImage(enhancedImage.image, 'enhanced_image.jpg');
    return enhancedImage.image;
  } catch (error) {
    console.log("Error enhancing image...", error.message);
    return;
  }
};

const uploadimage = async (file) => {
  const formData = new FormData();
  formData.append("image_file", file);

  // POST request with formData
  const {data} = await axios.post(`https://techhk.aoscdn.com/api/tasks/visual/scale`,formData,{
    headers: {
      "Content-Type": "multipart/form-data",
      "X-API-KEY": import.meta.env.VITE_API_KEY,
    },
    json:true
  });
  // Error handling for failed task creation
  if (!data?.data?.task_id) {
    throw new Error("Failed to enhance image: taskId missing");
  }

  return data.data.task_id;
};

const fetchingimage = async (taskId) => {
    console.log("Fetching image for task_id:", taskId);
    const { data } = await axios.get(`https://techhk.aoscdn.com/api/tasks/visual/scale/${taskId}`, {
        headers: {
            "X-API-KEY": import.meta.env.VITE_API_KEY,
        },
        json: true
    });
    console.log("Raw API response:", JSON.stringify(data, null, 2));
    
    // If the state is 4 (processing), return the data without checking for image
    if (data?.data?.state === 4) {
        return data.data;
    }

    // Only check for image if the state is not processing
    if (!data?.data?.image) {
        throw new Error("Failed to enhance image, image not found.");
    }

    return data.data;
};

const pollforimage = async (taskId, retries = 0) => {
  try {
    const result = await fetchingimage(taskId);
    console.log("Polling result:", result); // Debugging line

    // If state is 4 (processing), retry up to 20 times
    if (result.state === 4) {
      console.log("Image is still processing...");

      if (retries > 20) {
        throw new Error("Maximum retry limit reached. Please try later.");
      }
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
      return pollforimage(taskId, retries + 1);
    }

    // If we get here, the image should be available
    return result;
  } catch (error) {
    console.log("Polling error: ", error.message);
    throw error; 
  }
};

// Function to download image from URL
const downloadImage = async (imageUrl, fileName) => {
  try {
    const response = await axios.get(imageUrl, {
      responseType: 'blob'
    });
    
    // Create a blob from the response data
    const blob = new Blob([response.data], { type: 'image/jpeg' });
    
    // Create a link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(link.href);
    
    console.log('Image downloaded successfully');
  } catch (error) {
    console.error('Error downloading image:', error);
  }
};
