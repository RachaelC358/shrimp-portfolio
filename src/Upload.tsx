import React, { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { useAuthenticator } from '@aws-amplify/ui-react';

function Upload() {
    const { user } = useAuthenticator(); // Access user info from the Authenticator context
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        setFile(selectedFile);
    };

    const handleUpload = async () => {
        if (file && user) {  // Ensure file is not null and user is authenticated
            const userFolder = user.userId; // Use user's unique identifier (Cognito sub)
            const filePath = `picture-submissions/${userFolder}/${file.name}`; // Path includes user folder
    
            try {
                await uploadData({
                    path: filePath,  // Upload to user-specific folder
                    data: file,      // Pass the file as the data
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
