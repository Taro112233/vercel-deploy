import React, { useState, useEffect } from 'react';
import Index from './app/dashboard/page';
import Login from './app/login/page';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = sessionStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (email, password) => {
    if (email === 'thanatouchtaro@gmail.com' && password === '1234'
      || email === 'test@gmail.com' && password === '1234'
    ) {
      sessionStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);

      // Set timeout for auto logout after 15 min if mouse is not moved----------
      let timeout;
      const resetTimeout = () => {
        clearTimeout(timeout);
        timeout = setTimeout(handleLogout, 900000); // 15 min
      };

      window.addEventListener('mousemove', resetTimeout);
      resetTimeout();
    } else {
      alert('Invalid email or password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? <Index onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;