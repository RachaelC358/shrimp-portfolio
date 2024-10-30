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
        <div className='info-container'>
        <p>You've found Rachael Carpenter's file storage web app project! This is a demo project showcasing my practical experience with AWS cloud and ability to 
            create user-friendly websites with clean and functional designs. Click the 'Login/Sign Up' button at the top of this page to try it out! </p>
            </div>
           
  <div className='about-section-title'>
            <h3>Tech Stack</h3>
            </div>
            <div className="bullet-container">
            <div className="bullet-group">
           
            <li>Typescript </li>
            <li>React</li>
            <li>Bootstrap and custom CSS</li>
            <li>AWS Amplify</li>
            <li>AWS S3</li>
            <li>AWS IAM</li>
            </div>
            </div>
           
        <div className='about-section-title'>
        <h3>Focus on Security</h3> 
        </div>
      <ul>
    
    <li><strong>Data Encryption:</strong>
    <div className='info-container'>
        <li>All files are protected using AWS S3’s server-side encryption, applying advanced encryption standards to data at rest. Data is transmitted securely via HTTPS, preventing unauthorized access during upload and download.</li>
        </div>
    </li>

    <li><strong>Access Control:</strong>
    <div className='info-container'>
        <li>User access is managed through AWS IAM, allowing only authenticated users to upload or retrieve files.
       AWS Amplify manages user authentication, securing file access based on user permissions.</li>
       </div>
    </li>
  </ul>



    </div>
    </div>

  );
};

export default Home;