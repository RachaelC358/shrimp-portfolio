import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './Navbar';
import Home from './Home';
import { handleUpload, fetchPhotos, Photo } from './s3Service';

function App() {
  const S3_REQUESTS_ENABLED = true;
  const DOWNLOADS_ENABLED = true;
  const [file, setFile] = useState<File | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuthenticator((context) => [context.user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const uploadFile = async (): Promise<void> => {
    if (S3_REQUESTS_ENABLED && file && user) {
      try {
        await handleUpload(file, user.userId);
        console.log("File uploaded successfully.");
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  useEffect(() => {
    const loadPhotos = async (): Promise<void> => {
      setLoading(true);
      if (DOWNLOADS_ENABLED && user) {
        try {
          const photos = await fetchPhotos(user.userId);
          setPhotos(photos);
        } catch (error) {
          setError("Failed to load photos");
        }
      }
      setLoading(false);
    };

    if (user) {
      loadPhotos();
    }
  }, [user]);

  return (
    <Router>
      <main>
        <header>
          <Navbar user={user} />
        </header>
        <div className="navbar-border"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/account"
            element={
              <Authenticator>
                {({ user }) =>
                  user ? (
                    <div className="body-container">
                      <div className="top-body">
                        <div className="page-header">
                          <h1>Your Home for Secure File Storage</h1>
                        </div>
                        <div className="greeting">
                          <p>Welcome, {user?.signInDetails?.loginId}!</p>
                        </div>
                      </div>
                      <div className="bottom-body">
                        <div className="container flex-direction">
                          <div className="uploads-box">
                            <h2>Upload Files</h2>
                            <p>Select a file to upload securely.</p>
                            <div>
                              <input type="file" onChange={handleChange} />
                              <p>Max size: 10MB. Allowed types: PDF, DOCX, JPG</p>
                              <button onClick={uploadFile}>Upload</button>
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
                                    {photo.path} - 
                                    <a href={photo.downloadUrl} target="_blank" rel="noreferrer">
                                      Download
                                    </a>
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
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              </Authenticator>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
