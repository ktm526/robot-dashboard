import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { clientsAtom } from '../../atoms/socketAtom';
import Monitoring from './Monitoring';
import AMRTable from './AMRTable';
import AMRList from './AMRList';
import styles from './mainStyles'; // 스타일 임포트

const MainPage = () => {
  const [clients] = useAtom(clientsAtom); // AMR 연결 정보 Atom
  const [error, setError] = useState(true); // 오류 상태 관리

  useEffect(() => {
    if (clients && Object.keys(clients).length > 0) {
      const hasDisconnectedAMR = Object.values(clients).some((client) => !client.connected);
      setError(hasDisconnectedAMR); // 연결되지 않은 AMR이 있는지 여부를 설정
    }else{
      setError(false)
    }
  }, [clients]);

  return (
    <div style={styles.container}>
      {/* 페이지 제목 */}
      <h1 style={styles.pageTitle}>Main Monitoring</h1>
      
      {/* 좌우 레이아웃 */}
      <div style={styles.contentRow}>
        {/* 왼쪽 영역: Monitoring(3) + AMR Table(1) */}
        <div style={styles.leftColumn}>
          <div style={styles.monitoringSection}>
            <Monitoring error={error} clients={clients} />
          </div>
          <div style={styles.amrTableSection}>
            <AMRTable clients={clients} />
          </div>
        </div>

        {/* 오른쪽 영역: AMR List */}
        <div style={styles.rightColumn}>
          <AMRList clients={clients} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
