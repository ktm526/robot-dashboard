const styles = {
    container: {
      border: '2px solid #59575E',
      borderRadius: '20px',
      overflow: 'hidden',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      height: '28px',
      backgroundColor: '#59575E',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: 'white',
    },
    content: {
      flex: 1,
      padding: '10px',
      overflowY: 'auto',
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0',
    },
    leftSection: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginLeft: '10px',
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    amrId: {
      display: 'flex',
      alignItems: 'center',
      fontWeight: '600',
      fontSize: '16px',
    },
    statusIndicator: {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      marginLeft: '10px',
    },
    amrStatus: {
      marginTop: '5px',
      fontSize: '14px',
      color: '#707070',
    },
    dropdown: {
      padding: '5px',
      borderRadius: '5px',
      border: '1px solid #59575E',
      backgroundColor: '#2B2633',
      color: 'white',
    },
    settingsIcon: {
      width: '24px',
      height: '24px',
      cursor: 'pointer',
      fill: '#59575E',
    },
    divider: {
      border: 'none',
      borderBottom: '1px solid #707070',
      margin: '10px 0',
    },
    
    input: {
      borderRadius: '5px',
      backgroundColor: '#2B2633',
      height: '40px',
      textAlign:'center',
    },
    manualForm: {
        display: 'flex',
        gap: '10px',
        padding: '10px 0',
        transition: 'max-height 0.5s ease, opacity 0.5s ease', // 부드러운 전환
        overflow: 'hidden',
      },
      '@global': {
        '.manualForm-enter': {
          maxHeight: 0,
          opacity: 0,
        },
        '.manualForm-enter-active': {
          maxHeight: '100px',
          opacity: 1,
        },
        '.manualForm-exit': {
          maxHeight: '100px',
          opacity: 1,
        },
        '.manualForm-exit-active': {
          maxHeight: 0,
          opacity: 0,
        },
      },
      modal: {
        backgroundColor: 'black', // 모달 배경색
        borderRadius: '10px',
        padding: '20px',
        color: '#E7E964', // 텍스트 색상
        border: '1px solid #59575E',
      },
      modalTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#E7E964', // 제목 색상
        borderBottom: '1px solid #59575E', // 제목 아래 구분선
      },
      modalContent: {
        padding: '20px',
        fontSize: '14px',
        color: '#2B2633', // 컨텐츠 텍스트 색상
      },
      modalActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        borderTop: '1px solid #59575E', // 액션 위 구분선
      },
      closeButton: {
        color: '#E7E964', // 닫기 버튼 색상
        backgroundColor: '#59575E',
        borderRadius: '5px',
        padding: '5px 10px',
        border: '1px solid #E7E964',
        '&:hover': {
          backgroundColor: '#707070', // 호버 시 배경색
        },
      },
  };
  
  export default styles;
  