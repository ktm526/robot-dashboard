import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import Sidebar from './components/Sidebar';
import Main from './pages/Main/Main';
import MapEditor from './pages/MapEditor';
import Simulation from './pages/Simulation/Simulation';
import StreamingOverview from './pages/StreamingOverview';
import DataAnalysis from './pages/DataAnalysis';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { authAtom } from './atoms/authAtom';

const App = () => {
  const [isAuthenticated] = useAtom(authAtom);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <div className="login-container">
            <Login />
          </div>
        } />
        <Route
          path="*"
          element={
            isAuthenticated ? (
              <div style={{ display: 'flex' }}>
                <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <main
                  style={{
                    flexGrow: 1,
                    backgroundColor: '#2B2633',
                    color: 'white',
                    padding: '16px',
                    marginLeft: isSidebarOpen ? '320px' : '60px',  // 사이드바가 접힐 때 margin-left를 조절
                    transition: 'margin-left 0.3s ease',  // 부드러운 전환을 위한 애니메이션
                  }}
                >
                  <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/map-editor" element={<MapEditor />} />
                    <Route path="/simulation" element={<Simulation />} />
                    <Route path="/streaming-overview" element={<StreamingOverview />} />
                    <Route path="/data-analysis" element={<DataAnalysis />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </main>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
