import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { uploadData, list } from 'aws-amplify/storage';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './Home';

interface Photo {
  path: string;
  lastModified: string;
}

function App() {
  const S3_REQUESTS_ENABLED = false;
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
            path: `picture-submissions/${file.name}`,
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

  useEffect(() => {
    const fetchPhotos = async () => {
      if (S3_REQUESTS_ENABLED) {
        try {
          const result = await list({
            path: 'picture-submissions/',
            options: { listAll: true },
          });

          const items = result.items || [];
          const mappedPhotos: Photo[] = items.map((item: any) => ({
            path: item.path,
            lastModified: item.lastModified,
          }));

          setPhotos(mappedPhotos);
        } catch (err) {
          console.error('Error fetching photos:', err);
          setError('Failed to load photos');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        console.log("S3 requests are disabled.");
      }
    };

    fetchPhotos();
  }, []);

  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <Router>
      <main>
        <header>
          <nav className="navbar navbar-expand-sm bg-body-tertiary navbar-custom">
            <div className="container-fluid">
              <a className="navbar-brand navbar-zero-margin" href="/">
                <img src="/shrimpLogo4.png" alt="Logo" height="100px" width="auto" />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">About</Link>
                  </li>
                  {user ? (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link active" to="/account">My Files</Link>
                      </li>
                      <LogoutLink />
                    </>
                  ) : (
                    <li className="nav-item">
                      <Link className="nav-link active" to="/account">Login/Sign up</Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
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
                                  <li key={index}>{photo.path}</li>
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

const LogoutLink = () => {
  const { signOut } = useAuthenticator();

  return (
    <li className="nav-item">
      <a className="nav-link" href="#" onClick={async (e) => {
        e.preventDefault(); 
        await signOut();
      }}>
        Logout
      </a>
    </li>
  );
};

export default App;
