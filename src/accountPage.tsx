import React, { useState, useEffect } from 'react';
import { handleUpload, fetchPhotos, Photo } from './s3Service';
import { getUrl } from 'aws-amplify/storage';

interface AccountPageProps {
  user: {
    userId?: string;
    signInDetails?: {
      loginId?: string;
    };
  };
}

const AccountPage: React.FC<AccountPageProps> = ({ user }) => {
  const [file, setFile] = useState<File | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const uploadFile = async (): Promise<void> => {
    if (file && user?.userId) {
      try {
        await handleUpload(file, user.userId);
        console.log("File uploaded successfully.");
        setFile(null);
        loadPhotos();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };



  const generateDownloadAndDownload = async (photo: Photo, index: number) => {
    try {
      const urlResult = await getUrl({ path: photo.path });
      const updatedPhotos = [...photos];
      updatedPhotos[index] = { ...photo, downloadUrl: urlResult.url.toString() };
      setPhotos(updatedPhotos);
  
      // Create a temporary link element and trigger the download
      const link = document.createElement("a");
      link.href = urlResult.url.toString();
      link.download = photo.path.split('/').pop() || 'file'; // Set default filename if path is empty
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating download URL:", error);
    }
  };
  


  const loadPhotos = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    if (user?.userId) {
      try {
        const photos = await fetchPhotos(user.userId);
        setPhotos(photos);
      } catch (error) {
        setError("Failed to load photos");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user) {
      loadPhotos();
    }
  }, [user]);

  return (
    <div className="body-container">
      <div className="top-body">
        <div className="page-header">
          <h1>File Storage Account</h1>
        </div>
        <div className="greeting">
          <p>Welcome, {user?.signInDetails?.loginId ?? "User"}!</p>
        </div>
      </div>
      <div className="bottom-body">
        <div className="container flex-direction">
          <div className="uploads-box">
            <h2>Upload Files</h2>
            <p>Select a file to upload.</p>
            <div>
              <input type="file" onChange={handleChange} />
              <p>Max size: 10MB. Allowed types: PDF, DOCX, JPG</p>
              <button onClick={uploadFile} disabled={!file}>
                Upload
              </button>
            </div>
          </div>
          <div className="downloads-box">
            <h2>Stored Files</h2>
            {loading && <p>Loading photos...</p>}
            {error && <p>{error}</p>}
            {photos.length > 0 ? (
              <ul>
              {photos.map((photo, index) => (
                <li key={index}>
                  {photo.path} -{" "}
                  {photo.downloadUrl ? (
                    <a href={photo.downloadUrl} target="_blank" rel="noreferrer">
                      Download
                    </a>
                  ) : (
                    <button onClick={() => generateDownloadAndDownload(photo, index)}>
  Download
</button>
                  )}
                </li>
              ))}
            </ul>
            ) : (
              !loading && <p>No photos available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
