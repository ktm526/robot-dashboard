import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import Sidebar from './components/Sidebar';
import Main from './pages/Main';
import MapEditor from './pages/MapEditor';
import Simulation from './pages/Simulation';
import StreamingOverview from './pages/StreamingOverview';
import DataAnalysis from './pages/DataAnalysis';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { authAtom } from './atoms/authAtom';

const App = () => {
  const [isAuthenticated] = useAtom(authAtom);

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
                <Sidebar />
                <main style={{ flexGrow: 1, backgroundColor: '#2B2633', color: 'white', padding: '16px', marginLeft: '320px' }}>
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
