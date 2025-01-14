import React from 'react';
import ImageGallery from './ImageGallery';


const Home: React.FC = () => {
  const galleryImages = [
    { src: '/mobileShrimp.png', caption: 'Mobile Screen Size' },
    { src: '/shrimpDesktop.png', caption: 'Desktop Screen Size' },
  ];

  return (
    <div>
          <div className="body-container">
                        <div className="top-body">
                      
                        <div className="page-header-about-home" id="parallax-header">
  <h1>Welcome</h1>
</div>
   
      </div>
      </div>
      <div className="home-paragraph section">
        <div className='info-container'>
        <p>You've found Rachael Carpenter's file storage web application! This is a project showcasing my practical experience with AWS cloud and ability to 
            create user-friendly websites with clean, responsive designs. Click the 'Login/Sign Up' button at the top of this page to try it out! </p>
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
            <h3>Features</h3>
            </div>
            <div className="bullet-container">
            <div className="bullet-group">
            <li>User Account Creation and Authentication </li>
            <li>User Dashboard </li>  
            <li>File Upload </li>
            <li>List of Stored Files</li>
            <li>Download Links for Stored File Retrieval</li>
            </div>
            </div>

            <div className='about-section-title'>
            <h3>Solution Architecture Diagram</h3>
            <img src="/SAD.png" alt="Logo" height="700px" width="auto" />
            </div>

            <ImageGallery title="Responsive Page Designs" images={galleryImages} />
           
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
    <div className='end-page-spacer'/>
    </div>
  );
};

export default Home;