import React, { useState } from 'react';
import { ReactComponent as SettingsIcon } from '../../assets/clipboard.svg'; // 설정 아이콘
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'; // MUI Dialog 컴포넌트 임포트
import { CSSTransition } from 'react-transition-group'; // 애니메이션 라이브러리
import styles from './AMRListStyles';

const AMRList = () => {
  // 가상의 AMR 데이터
  const amrList = [
    { id: 'amr001', status: 'Full Auto', connected: false },
    { id: 'amr002', status: 'Full Auto', connected: false },
    { id: 'amr003', status: 'Full Auto', connected: false },
  ];

  // 드롭다운 선택 상태 관리
  const [amrStatus, setAmrStatus] = useState({
    amr001: 'Full Auto',
    amr002: 'Full Auto',
    amr003: 'Full Auto',
  });

  // From, To 값 상태 관리
  const [formData, setFormData] = useState({
    amr001: { from: '', to: '' },
    amr002: { from: '', to: '' },
    amr003: { from: '', to: '' },
  });

  // 모달 열기/닫기 상태 관리
  const [openModal, setOpenModal] = useState(false);

  // 모달 열기 함수
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setAmrStatus((prevStatus) => ({
      ...prevStatus,
      [id]: newStatus,
    }));
  };

  const handleInputChange = (id, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: {
        ...prevData[id],
        [field]: value,
      },
    }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerTitle}>AMR List</div>
      </div>
      <div style={styles.content}>
        {amrList.map((amr, index) => (
          <React.Fragment key={amr.id}>
            <div style={styles.listItem}>
              <div style={styles.leftSection}>
                <div style={styles.amrId}>
                  {amr.id}
                  <span
                    style={{
                      ...styles.statusIndicator,
                      backgroundColor: amr.connected ? 'green' : 'red',
                    }}
                  ></span>
                </div>
                <div style={styles.amrStatus}>N/A</div>
              </div>
              <div style={styles.rightSection}>
                <select
                  value={amrStatus[amr.id]}
                  onChange={(e) => handleStatusChange(amr.id, e.target.value)}
                  style={styles.dropdown}
                >
                  <option value="Full Auto">Full Auto</option>
                  <option value="Semi Auto">Semi Auto</option>
                  <option value="Manual">Manual</option>
                </select>
                <SettingsIcon style={styles.settingsIcon} onClick={handleOpenModal} />
              </div>
            </div>

            {/* Manual 상태일 경우 From과 To 입력 폼 표시 */}
            <CSSTransition
              in={amrStatus[amr.id] === 'Manual'}
              timeout={500}
              classNames="manualForm"
              unmountOnExit
            >
              <div style={styles.manualForm}>
                <TextField
                  label="From"
                  value={formData[amr.id].from}
                  onChange={(e) => handleInputChange(amr.id, 'from', e.target.value)}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    style: { height: '40px', display: 'flex', alignItems: 'center' },
                  }}
                  InputLabelProps={{
                    style: { color: '#707070', fontSize: '12px' },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-input::placeholder': {
                      color: '#707070',
                      fontSize: '12px',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#E7E964',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#E7E964',
                    },
                  }}
                />
                <TextField
                  label="To"
                  value={formData[amr.id].to}
                  onChange={(e) => handleInputChange(amr.id, 'to', e.target.value)}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    style: { height: '40px', display: 'flex', alignItems: 'center' },
                  }}
                  InputLabelProps={{
                    style: { color: '#707070', fontSize: '12px' },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-input::placeholder': {
                      color: '#707070',
                      fontSize: '12px',
                    },
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#E7E964',
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#E7E964',
                    },
                  }}
                />
              </div>
            </CSSTransition>

            {index < amrList.length  && <hr style={styles.divider} />}
          </React.Fragment>
        ))}
      </div>

      {/* 모달 구현 */}
      <Dialog
  open={openModal}
  onClose={handleCloseModal}
  classes={{ paper: styles.modal }}
>
  <DialogTitle classes={{ root: styles.modalTitle }}>Settings</DialogTitle>
  <DialogContent classes={{ root: styles.modalContent }}>
    <p>Here are the settings for your AMR.</p>
  </DialogContent>
  <DialogActions classes={{ root: styles.modalActions }}>
    <Button onClick={handleCloseModal} style={styles.closeButton}>
      Close
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
};

export default AMRList;
