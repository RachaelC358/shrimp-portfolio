
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

import { useAuthenticator } from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FileUploader } from "@aws-amplify/ui-react-storage";

function App() {
  const { user, signOut } = useAuthenticator();

  return (
    <main>
       <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="./src/assets/shrimpLogo.png" alt="Logo" height="35%" width="35%" />
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
      <body>
      <h1>{user?.signInDetails?.loginId}'s files</h1>
      <div>
        <FileUploader
        acceptedFileTypes={['pdf, docx, doc']}
        path="public/"
        maxFileCount={1}
        />
      </div>
      <button onClick={signOut}>Sign out</button>
      </body>
    </main>
  );
}

export default App;
