import React, { useState } from 'react';
import { cloudinary_uploadPreset, Cloudinary_uploadPreset } from '../../utils/config';



const CloudinaryUpload= ({ setUrl, setName }) => {
  const [audioFile, setAudioFile] = useState(null);

  const handleAudioChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!audioFile) {
      alert('Please select an audio file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('upload_preset', cloudinary_uploadPreset); // Cloudinary upload preset
    formData.append('resource_type', 'auto'); // Automatically detect file type (audio in this case)

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dnx2g5kyy/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.secure_url) {
        setUrl(data.secure_url); // Set the uploaded audio URL
        setName(data.public_id); // Set the audio file name or public ID
        console.log('Upload successful:', data);
      } else {
        console.error('Error uploading audio:', data);
      }
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleAudioChange} />
      <button className='text-black text-semibold  bg-white' onClick={handleUpload}>Upload Audio</button>

      {/* Optional: display the uploaded audio player */}
      {setUrl && (
        <div>
          <audio controls>
            <source src={setUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};




export default CloudinaryUpload;



