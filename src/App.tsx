import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { uploadData, list, getUrl } from 'aws-amplify/storage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './Home';
import Navbar from './Navbar';

interface Photo {
  path: string;
  lastModified: string;
  downloadUrl: string; // Add downloadUrl property
}

function App() {
  const S3_REQUESTS_ENABLED = true;
  const DOWNLOADS_ENABLED = true; // Enable downloads
  const [file, setFile] = useState<File | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (S3_REQUESTS_ENABLED) {
      if (file) {
        try {
          await uploadData({
            path: `picture-submissions/${user.userId}/${file.name}`,
            data: file,
          });
          console.log("File uploaded successfully.");
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      } else {
        console.error("No file selected for upload.");
      }
    } else {
      console.log("S3 requests are disabled.");
    }
  };

  const { user } = useAuthenticator((context) => [context.user]);

    useEffect(() => {
      const fetchPhotos = async () => {
        if (DOWNLOADS_ENABLED && user && user.userId) {  // Check for user.userId
          try {
            const result = await list({
              path: `picture-submissions/${user.userId}/`, // User's folder
              options: { listAll: true },
            });
    
            const items = result.items || [];
            const mappedPhotos: Photo[] = await Promise.all(
              items.map(async (item: any) => {
                const linkToStorageFile = await getUrl({
                  path: `picture-submissions/${user.userId}/`,
                });
    
                return {
                  path: item.path,
                  lastModified: item.lastModified,
                  downloadUrl: linkToStorageFile.url.toString(),
                };
              })
            );
    
            setPhotos(mappedPhotos);
          } catch (err) {
            console.error("Error fetching photos:", err);
            setError("Failed to load photos");
          }
        }
        setLoading(false);  // Ensure loading is false after fetch
      };
    
      if (user && user.userId) {  // Only call fetchPhotos if user is defined and has userId
        fetchPhotos();
      }
    }, [user && user.userId]);  // Use specific user property to reduce unintended re-renders
    
    
  



  return (
    <Router>
      <main>
        <header>
        <Navbar user={user} />
        </header>
        <div className="navbar-border"></div>

        {/* Routing Setup */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/account"
            element={
              <Authenticator>
                {({ user }) => (
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
                              <button onClick={handleUpload}>Upload</button>
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
                )}
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
