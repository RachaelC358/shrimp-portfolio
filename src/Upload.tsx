import React, { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { useAuthenticator } from '@aws-amplify/ui-react';

function Upload() {
    const { user } = useAuthenticator(); 
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (file && user) {  
            const userFolder = user.userId; 
            const filePath = `picture-submissions/${userFolder}/${file.name}`; 
    
            try {
                await uploadData({
                    path: filePath,  
                    data: file,
                });
                console.log('File uploaded successfully');
            } catch (error) {
                console.error('File upload failed:', error);
            }
        } else {
            alert('Please select a file to upload and ensure you are logged in');
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
