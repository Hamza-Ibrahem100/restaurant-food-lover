import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut, deleteUser } from 'firebase/auth';
import { auth } from '../firebase';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, showPopup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    setIsOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogout = async () => {
    if (!user) return;
    
    try {
      const userAuth = auth.currentUser;
      await signOut(auth);
      if (userAuth) {
        await deleteUser(userAuth);
      }
      showPopup('Account deleted successfully.', true);
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } catch (error) {
      console.error('Delete account error:', error);
      showPopup('Failed to delete account.', false);
    }
  };

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'menu', label: 'Menu' },
    { id: 'specials', label: 'Specials' },
    { id: 'ordering', label: 'Order' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reservation', label: 'Reserve' }
  ];

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <Link to="/" className="logo">Food Lover</Link>
          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link.id}>
                <button 
                  onClick={() => scrollToSection(link.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  {link.label}
                </button>
              </li>
            ))}
            {user ? (
              <li className="user-menu">
                <span className="user-name">{user.firstName || 'User'}</span>
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li><Link to="/login">Login</Link></li>
            )}
          </ul>
          <div 
            className={`hamburger ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <ul>
          {navLinks.map(link => (
            <li key={link.id}>
              <button 
                onClick={() => scrollToSection(link.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Playfair Display', serif", fontSize: '32px', color: 'var(--text-primary)' }}
              >
                {link.label}
              </button>
            </li>
          ))}
          {user ? (
            <li className="user-menu">
              <span className="user-name">{user.firstName || 'User'}</span>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Nav;