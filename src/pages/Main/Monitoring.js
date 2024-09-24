import React from 'react';
import testImage from '../../assets/test.png'; // 이미지 캔버스에 표시할 이미지
import styles from './MonitoringStyles';

const Monitoring = ({ error, clients }) => {
    console.log(error)
  return (
    <div style={styles.container}>
      <div style={styles.header}>Monitoring</div>
      
      {/* 이미지 캔버스 */}
      <div style={styles.imageContainer}>
        <img src={testImage} alt="Monitoring Canvas" style={styles.image} />
      </div>

      {/* 오류 여부 컴포넌트 */}
      <div style={error ? styles.errorContainer : styles.successContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20.83"
          height="18.662"
          viewBox="0 0 20.83 18.662"
          style={{ fill: error ? 'red' : 'green' , marginRight:'10px'}} // 상태에 따라 fill 색상 변경
        >
          <rect width="20.83" height="18.662" opacity="0" />
          <path d="M12.51,1.338l7.578,13.2a2.808,2.808,0,0,1,.381,1.367A2.527,2.527,0,0,1,17.8,18.555H2.666A2.527,2.527,0,0,1,0,15.908a2.637,2.637,0,0,1,.381-1.367l7.578-13.2a2.6,2.6,0,0,1,4.551,0ZM9.15,14.258a1.09,1.09,0,0,0,2.178,0,1.089,1.089,0,0,0-2.178,0Zm.166-8.35.127,5.313a.737.737,0,0,0,.8.811.725.725,0,0,0,.772-.811l.146-5.3a.885.885,0,0,0-.928-.9A.859.859,0,0,0,9.316,5.908Z" />
        </svg>
        <span style={styles.message}>
          {error ? '연결되지 않은 AMR이 있습니다!' : '모든 AMR이 정상적으로 연결되었습니다.'}
        </span>
      </div>
    </div>
  );
};

export default Monitoring;
