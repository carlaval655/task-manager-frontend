import { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await axios.get('/auth/me');
      setUser(res.data);
    } catch {
      setUser(null);
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchUser();
    } else {
      navigate('/login');
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};