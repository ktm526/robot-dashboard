import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { authAtom } from '../atoms/authAtom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setAuth = useSetAtom(authAtom);

  const handleLogin = async () => {
    try {
      // 로그인 로직을 여기에 추가하세요.
      if (username === 'admin' && password === 'admin1234') {
        setAuth(true);
        navigate('/'); // 성공 시 메인 페이지로 이동
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div style={{
      color: 'white',
      backgroundColor: '#59575E', // 페이지 배경색
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '350px',
        padding: '40px',
        backgroundColor: '#2C2A35',
        borderRadius: '20px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '26px', marginBottom: '0' }}>다중 로봇 관제 시스템</h1>
        <h2 style={{ fontSize: '14px', fontWeight: 'normal', marginTop: '5px', marginBottom: '10px' }}>Multi-robot control system and remote control</h2>
        
        {/* Inputs with rounded edges */}
        <label style={{ fontSize: '14px', textAlign: 'left', marginBottom: '5px' }}>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ padding: '10px', backgroundColor: 'transparent', border: '1px solid #48464F', borderRadius: '6px', color: 'white' }}
        />
        
        <label style={{ fontSize: '14px', textAlign: 'left', marginBottom: '5px' }}>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ padding: '10px', backgroundColor: 'transparent', border: '1px solid #48464F', borderRadius: '6px', marginBottom: '15px', color: 'white' }}
        />
        
        {/* Buttons with rounded edges */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
          gap: '10px'
        }}>
          <button type="button" style={{
            padding: '10px',
            flexGrow: 1,
            backgroundColor: 'transparent',
            border: '1px solid #48464F',
            borderRadius: '10px', // Rounded edges for buttons
            color: 'white'
          }}>Settings</button>
          <button onClick={handleLogin} type="button" style={{
            padding: '10px',
            flexGrow: 1,
            backgroundColor: '#E7E964',
            color: '#293351',
            border: 'none',
            borderRadius: '10px' // Rounded edges for buttons
          }}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
