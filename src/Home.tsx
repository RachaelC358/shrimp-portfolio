import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
          <div className="body-container">
                        <div className="top-body">
                        <div className="page-header-about">
      <h1 >About this Project</h1>
      </div>
      </div>
      </div>
      <div className="home-paragraph section">
        <p>This project was built using AWS Amplify, React, Vite, and Typescript. AWS S3 was used for file storage and IAM was used for access policies. The navbar is a customized Bootstrap library component.</p>
        <p>I chose this project to learn more about cloud services and practice creating secure applications while showcaseing my ability to create user-friendly websites with clean and functional designs. </p>
        <p>I learned how to create user roles and policies in AWS and set up bucket policies in S3. Amplify made setting up user authentication and running deployments a breeze.</p>
        <h4>Focus on Security</h4> 

      <ul>
    
    <li><strong>Data Encryption:</strong>
      
        <li>All files are protected using AWS S3’s server-side encryption, applying advanced encryption standards to data at rest. Data is transmitted securely via HTTPS, preventing unauthorized access during upload and download.</li>
      
    </li>

    <li><strong>Access Control:</strong>
      
        <li>User access is managed through AWS IAM, allowing only authenticated users to upload or retrieve files.
       AWS Amplify manages user authentication, securing file access based on user permissions.</li>
    
    </li>

    <li><strong>Fine-Grained Access:</strong>
      
        <li>Strict bucket policies provide customized, secure access.</li>
      
    </li>
  </ul>

  <h4>Website Features</h4> 
  <ul>
  <li>Mobile First Reactive Design</li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  </ul>

    </div>
    </div>

  );
};

export default Home;