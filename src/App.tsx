import { useAuthenticator } from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { list } from "aws-amplify/storage";


// Adjust the Photo interface based on the structure of items in the result
interface Photo {
  path: string,
  lastModified: string 
}

function App() {
  const { user, signOut } = useAuthenticator();

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
  };

  // Fetch photos when the component mounts
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const result = await list({
          path: 'picture-submissions/',
          options: {listAll:true},
          // Alternatively, path: ({ identityId }) => `album/{identityId}/1.jpg`
        });

        // Inspect the structure of `result` here
        // If `result` has a `files` or `Contents` property, use that:
        const items = result.items || []; // Adjust according to the actual structure

        // Map over `items` to extract photo keys
        const mappedPhotos: Photo[] = items.map((item: any) => ({
          path: item.path,
          lastModified: item.lastModified // Adjust this based on the actual field name
        }));

        setPhotos(mappedPhotos);
      } catch (err) {
        console.error('Error fetching photos:', err);
        setError('Failed to load photos');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <main>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img src="/shrimpLogo.png" alt="Logo" height="35%" width="35%" />
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
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="container">

      <div>
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <h1>{user?.signInDetails?.loginId}'s files</h1>
      <button onClick={signOut}>Sign out</button>

      {/* Render loading, error, or list of photos */}
      {loading && <p>Loading photos...</p>}
      {error && <p>{error}</p>}
      {photos.length > 0 ? (
        <ul>
          {photos.map((photo, index) => (
            <li key={index}>{photo.path}</li> // Adjust based on your data structure
          ))}
        </ul>
      ) : (
        !loading && <p>No photos available.</p>
      )}
      </div>
    </main>
  );
}

export default App;
