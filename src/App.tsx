import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import TrackingForm from './components/TrackingForm';
import ActionButtons from './components/ActionButtons';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import EstimateModal from './components/EstimateModal';
import ShipModal from './components/ShipModal';
import NewCustomerModal from './components/NewCustomerModal';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import TrackingPage from './components/TrackingPage';

interface User {
  id: number;
  username: string;
  email: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showEstimate, setShowEstimate] = useState(false);
  const [showShip, setShowShip] = useState(false);
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [trackingResult, setTrackingResult] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setShowNewCustomer(true);
  };

  const handleLoginSuccess = (userData: User, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setShowLogin(false);
  };

  const handleRegisterSuccess = (userData: User, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setShowNewCustomer(false);
  };

  return (
    <Router>
      <div className="App">
        <Header 
          user={user}
          onLogin={handleLoginClick}
          onRegister={handleRegisterClick}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={
            <>
              {/* Hero Section with background */}
              <section className="hero-bg">
                <div className="hero-section">
                  <div className="company-quote">
                    At Noble Speedytrac Inc., we specialize in fast, reliable, and secure logistics solutions tailored to your business needs. From first mile to last mile, we ensure your cargo reaches its destination on time, every time.
                    Your trusted logistics partner — driven by precision, powered by innovation.
                  </div>
                  <div className="tracking-card">
                    <div className="tracking-tab">
                      <span className="tracking-tab-icon">📦</span> Tracking Package
                    </div>
                    <span className="tracking-sub">Looking for a shipment update?</span>
                    <TrackingForm />
                  </div>
                  <h1 className="hero-title">FAST. RELIABLE. SECURE.<br />Toronto's go-to delivery service.</h1>
                  <ActionButtons 
                    onEstimate={() => setShowEstimate(true)}
                    onShip={() => setShowShip(true)}
                    onNewCustomer={() => setShowNewCustomer(true)}
                  />
                </div>
              </section>
              {/* Specialty Delivery Areas */}
              <section className="specialty-section">
                <h2 className="specialty-title">Our Specialty Delivery Areas</h2>
                <div className="specialty-grid">
                  <div className="specialty-card">
                    <span className="specialty-icon">🔌</span>
                    <span className="specialty-label">Technology<br />and Electronics</span>
                  </div>
                  <div className="specialty-card">
                    <span className="specialty-icon">🩺</span>
                    <span className="specialty-label">Medical<br />Supplies</span>
                  </div>
                  <div className="specialty-card">
                    <span className="specialty-icon">🍽️</span>
                    <span className="specialty-label">Catering<br />Services</span>
                  </div>
                  <div className="specialty-card">
                    <span className="specialty-icon">🏭</span>
                    <span className="specialty-label">General Manufacturing<br />Products</span>
                  </div>
                  <div className="specialty-card">
                    <span className="specialty-icon">📄</span>
                    <span className="specialty-label">Confidential Documents</span>
                  </div>
                </div>
              </section>
            </>
          } />
          <Route path="/track/:trackingNumber" element={<TrackingPage />} />
        </Routes>
        {/* Footer / Bottom Banner */}
        <footer className="footer-banner">
          <div className="footer-content">
            <div className="footer-left">
              <span className="footer-logo">📦</span>
              <span className="footer-brand">Noble SpeedyTrac. inc</span>
            </div>
            <div className="footer-center">
              &copy; {new Date().getFullYear()} Noble SpeedyTrac. inc. All rights reserved.
            </div>
            <div className="footer-right">
              <span>Contact: <a href="mailto:info@noblespeedytrac.com">info@noblespeedytrac.com</a></span>
              <span> | </span>
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
        </footer>
        {/* Modals */}
        {showLogin && (
          <LoginModal 
            onClose={() => setShowLogin(false)}
            onSuccess={handleLoginSuccess}
            onSwitchToRegister={() => {
              setShowLogin(false);
              setShowNewCustomer(true);
            }}
          />
        )}
        {showEstimate && (
          <EstimateModal 
            onClose={() => setShowEstimate(false)}
          />
        )}
        {showShip && (
          <ShipModal 
            onClose={() => setShowShip(false)}
            user={user}
          />
        )}
        {showNewCustomer && (
          <NewCustomerModal 
            onClose={() => setShowNewCustomer(false)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
