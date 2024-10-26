import { useAuthenticator } from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { list } from "aws-amplify/storage";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// Adjust the Photo interface based on the structure of items in the result
interface Photo {
  path: string,
  lastModified: string 
}

function App() {
  const { user, signOut } = useAuthenticator();
  
  // Toggle switch for S3 requests
  const S3_REQUESTS_ENABLED = false; // Set this to true to enable requests

  // Initialize file state and photos state
  const [file, setFile] = useState<File | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Handle file input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (S3_REQUESTS_ENABLED) { // Check if requests are enabled
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

  // Fetch photos when the component mounts
  useEffect(() => {
    const fetchPhotos = async () => {
      if (S3_REQUESTS_ENABLED) { // Check if requests are enabled
        try {
          const result = await list({
            path: 'picture-submissions/',
            options: { listAll: true },
          });

          const items = result.items || []; // Adjust according to the actual structure

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

  return (
    <main>
      <header>
        <nav className="navbar navbar-expand-sm bg-body-tertiary navbar-custom">
          <div className="container-fluid">
            <a className="navbar-brand navbar-zero-margin" href="#">
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
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={signOut}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="body-container">
        <div className='page-header'>
          <h1>Secure File Storage</h1>
        </div>  

        <div className="greeting">        
          <h3>Welcome, {user?.signInDetails?.loginId}!</h3>  
        </div> 

        <div className="container flex-direction">
          <div className="uploads-box">
            <h2>Upload Files</h2>
            <p>Select a file to upload securely</p>
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
    </main>
  );
}

export default App;