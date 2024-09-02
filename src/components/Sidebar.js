import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { ReactComponent as HomeIcon } from '../assets/home.svg';
import { ReactComponent as MapIcon } from '../assets/map.svg';
import { ReactComponent as SimulationIcon } from '../assets/simulation.svg';
import { ReactComponent as StreamingIcon } from '../assets/streaming.svg';
import { ReactComponent as DataAnalysisIcon } from '../assets/dataanalysis.svg';
import { ReactComponent as SettingsIcon } from '../assets/settings.svg';
import { ReactComponent as LogoutIcon } from '../assets/logout.svg';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [textVisible, setTextVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setTextVisible(true), 200);
    } else {
      setTextVisible(false);
    }
  }, [isOpen]);

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
    <div
      style={{
        width: isOpen ? '320px' : '60px',
        height: '100vh',
        backgroundColor: '#4D4B50',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '10px',
        boxSizing: 'border-box',
        position: 'fixed',
        top: 0,
        left: 0,
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.5)',
        transition: 'width 0.2s ease',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onClick={toggleSidebar}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60px', // 제목의 고정된 높이를 유지
        }}
      >
        <h1
          style={{
            fontSize: '26px',
            fontWeight: 600,
            letterSpacing: '-0.25px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            flexGrow: 1,
            marginLeft: '0px',
            transition: 'opacity 0.2s ease',
            opacity: isOpen ? 1 : 0, // 사이드바가 접히면 투명화
          }}
        >
          로봇 관제 시스템
        </h1>
      </div>
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
              padding: '10px 5px', // 일관된 패딩 적용
              fontWeight: 400,
              letterSpacing: '-0.25px',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ListItemIcon
              style={{
                color: 'inherit',
                minWidth: '40px',
                //paddingLeft: '0px', // 패딩을 고정
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              style={{
                fontSize: '18px',
                marginLeft: '10px',
                opacity: textVisible ? 1 : 0,
                transition: 'opacity 0.2s ease',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            />
          </ListItem>
        ))}
      </List>
      <div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLogout();
          }}
          style={{
            marginTop: '10px',
            padding: '10px',
            width: '100%',
            cursor: 'pointer',
            backgroundColor: '#2B2633',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Pretendard, sans-serif',
            fontSize: isOpen ? '16px' : '24px',
            fontWeight: '600',
            transition: 'font-size 0.2s ease',
          }}
        >
          {isOpen ? 'Logout' : <LogoutIcon />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
