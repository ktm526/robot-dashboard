import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { clientsAtom } from '../../atoms/socketAtom';
import styles from './AMRTableStyles';

const AMRTable = () => {
  const [clients] = useAtom(clientsAtom); // 웹소켓에서 받아오는 데이터
  const amrData = ['amr001', 'amr002', 'amr003'];

  const getAMRStatus = (id) => {
    if (clients && clients[id]) {
      return clients[id]; // 클라이언트 정보가 있는 경우 출력
    } else {
      return { status: '연결되지 않음' }; // 클라이언트 정보가 없을 때 출력
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.tableHeaderItem}>AMR</div>
        <div style={styles.tableHeaderItem}>적재제품정보</div>
        <div style={styles.tableHeaderItem}>From</div>
        <div style={styles.tableHeaderItem}>To</div>
        <div style={styles.tableHeaderItem}>작업 상태</div>
        <div style={styles.tableHeaderItem}>이상 여부</div>
        <div style={styles.tableHeaderItem}>Log</div>
      </div>
      <table style={styles.tableContainer}>
        <tbody>
          {amrData.map((amrId, index) => {
            const amrInfo = getAMRStatus(amrId);
            return (
              <React.Fragment key={amrId}>
                <tr style={styles.tableRow}>
                  <td style={styles.tableCell}>{amrId}</td>
                  <td style={styles.tableCell}>{amrInfo.loadProduct || 'N/A'}</td>
                  <td style={styles.tableCell}>{amrInfo.from || 'N/A'}</td>
                  <td style={styles.tableCell}>{amrInfo.to || 'N/A'}</td>
                  <td style={styles.tableCell}>{amrInfo.workStatus || 'N/A'}</td>
                  <td style={styles.tableCell}>{amrInfo.status || '연결되지 않음'}</td>
                  <td style={styles.tableCell}>{amrInfo.log || 'N/A'}</td>
                </tr>
                {/* 마지막 행에는 구분선이 없도록 설정 */}
                {index < amrData.length - 1 && <div style={styles.rowDivider}></div>}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AMRTable;
