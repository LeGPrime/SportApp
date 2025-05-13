import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  
  const redirect = location.search ? location.search.split('=')[1] : '/';
  
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h1>Connexion</h1>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      {message && <div style={{ color: 'red', marginBottom: '1rem' }}>{message}</div>}
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <form onSubmit={submitHandler}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
              required
            />
          </div>
          
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '1rem',
            }}
          >
            Se connecter
          </button>
        </form>
      )}
      
      <div style={{ marginTop: '1rem' }}>
        Pas encore de compte?{' '}
        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
          S'inscrire
        </Link>
      </div>
    </div>
  );
};

export default LoginScreen;