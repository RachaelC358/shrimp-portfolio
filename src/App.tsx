import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './Navbar';
import Home from './Home';
import AccountPage from './accountPage';

function App() {
  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <Router>
      <main>
        <header>
          <Navbar user={user} />
        </header>
        <div className="navbar-border"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/account"
            element={
              <Authenticator>
                {({ user }) => (user ? <AccountPage user={user} /> : <Navigate to="/" replace />)}
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
