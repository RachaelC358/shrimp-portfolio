import React from 'react';


const Contact: React.FC = () => {

  return (
    <div>
          <div className="body-container">
                        <div className="top-body">
                        <div className="page-header-about">
      <h1 >Contact Info</h1>
      </div>
      </div>
      </div>
      <div className="home-paragraph section">
            <div className='about-section-title'>
            <h3>LinkedIn</h3>
            </div>
            <a href="https://www.linkedin.com/in/rachael-carpenter-csengineer/" style={{ color: 'blue', textDecoration: 'underline' }}>
            https://www.linkedin.com/in/rachael-carpenter-csengineer/
      </a>
  
    <div className='about-section-title'>
            <h3>Github</h3>
            </div>
            <a href="https://github.com/RachaelC358" style={{ color: 'blue', textDecoration: 'underline' }}>
            https://github.com/RachaelC358
      </a>
    </div>
  </div>
  );
};

export default Contact;