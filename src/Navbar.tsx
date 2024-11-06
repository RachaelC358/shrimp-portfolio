import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

const Navbar = ({ user }: { user: any }) => {
  return (

<nav className="navbar navbar-expand-sm bg-body-tertiary navbar-custom">
            <div className="container-fluid">
              <a className="navbar-brand navbar-zero-margin" href="/">
                <img src="/shrimpLogo4.png" alt="Logo" height="96px" width="auto" />
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
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/contact">Contact</Link>
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
  );
};

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

export default Navbar;