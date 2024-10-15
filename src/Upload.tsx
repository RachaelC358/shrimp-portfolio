import React, { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';

function Upload() {
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (file) {  // Ensure file is not null before proceeding
            try {
                await uploadData({
                    path: `${file.name}`,  // Correct the path to file name
                    data: file,  // Pass the file as the data
                });
                console.log('File uploaded successfully');
            } catch (error) {
                console.error('File upload failed:', error);
            }
        } else {
            alert('Please select a file to upload');
        }
    };

    return (
        <div>
            <input type="file" onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default Upload;
