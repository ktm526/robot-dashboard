import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { ReactComponent as HomeIcon } from '../assets/home.svg';
import { ReactComponent as MapIcon } from '../assets/map.svg';
import { ReactComponent as SimulationIcon } from '../assets/simulation.svg';
import { ReactComponent as StreamingIcon } from '../assets/streaming.svg';
import { ReactComponent as DataAnalysisIcon } from '../assets/dataanalysis.svg';
import { ReactComponent as SettingsIcon } from '../assets/settings.svg';
import { ReactComponent as LogoutIcon } from '../assets/logout.svg';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { text: '메인 모니터링', icon: <HomeIcon />, path: '/' },
    { text: '맵 편집하기', icon: <MapIcon />, path: '/map-editor' },
    { text: '시뮬레이션', icon: <SimulationIcon />, path: '/simulation' },
    { text: '스트리밍 & 오버뷰', icon: <StreamingIcon />, path: '/streaming-overview' },
    { text: '데이터 분석', icon: <DataAnalysisIcon />, path: '/data-analysis' },
    { text: '설정', icon: <SettingsIcon />, path: '/settings' },
  ];

  const handleLogout = () => {
    const confirmLogout = window.confirm('로그아웃 하시겠습니까?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  return (
    <div style={{
      width: '320px',
      height: '100vh',
      backgroundColor: '#4D4B50',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '20px',
      boxSizing: 'border-box',
      position: 'fixed',
      top: 0,
      left: 0
    }}>
      <div>
        <h1 style={{ marginBottom: '40px', fontSize: '26px', textAlign: 'center', fontWeight: 600, letterSpacing: '-0.25px' }}>로봇 관제 시스템</h1>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              style={{
                backgroundColor: location.pathname === item.path ? '#2B2633' : 'transparent',
                color: location.pathname === item.path ? 'white' : 'white',
                marginBottom: '10px',
                borderRadius: '10px',
                padding: '10px 20px',
                fontWeight: 400,
                letterSpacing: '-0.25px'
              }}
            >
              <ListItemIcon style={{ color: 'inherit', minWidth: '40px' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} style={{ fontSize: '18px' }} />
            </ListItem>
          ))}
        </List>
      </div>
      <div>
        <button onClick={handleLogout} style={{
          padding: '10px',
          width: '100%',
          cursor: 'click',
          backgroundColor: '#2B2633',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 600,
          letterSpacing: '-0.25px',
          fontFamily: 'Pretendard, sans-serif',
          fontSize: '21px' // 로그아웃 버튼 폰트 사이즈 설정
        }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
