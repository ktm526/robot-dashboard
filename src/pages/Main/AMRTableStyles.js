const styles = {
    container: {
      border: '2px solid #59575E',
      borderRadius: '20px',
      height: '100%',
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      overflow: 'hidden',
      padding: '0', // 불필요한 여백 제거
    },
    header: {
      backgroundColor: '#59575E',
      height: '28px',
      display: 'flex',
      alignItems: 'center',
      fontFamily: 'Pretendard, sans-serif',
      fontWeight: '600',
      fontSize: '14px',
      color: 'white',
      borderRadius: '15px 15px 0 0',
    },
    tableContainer: {
      width: '100%',
      height: '100%',
      overflowY: 'auto',
      borderSpacing: '0',
      borderCollapse: 'collapse',
    },
    tableRow: {
      display: 'flex', // Flexbox로 변경하여 레이아웃 제어
      justifyContent: 'space-between',
      padding: '10px 0',
    },
    tableCell: {
      fontSize: '12px',
      fontWeight: '200',
      textAlign: 'center',
      padding: '5px',
      verticalAlign: 'middle',
      width: '14.28%', // 각 셀의 너비를 동일하게 설정 (전체 7개의 항목을 동일한 폭으로 나눔)
    },
    tableHeaderItem: {
      textAlign: 'center',
      padding: '10px',
      verticalAlign: 'middle',
      width: '14.28%', // 제목 항목들도 동일한 너비로 설정
    },
    rowDivider: {
      height: '1px',
      backgroundColor: '#707070',
      margin: '0 15px', // 양쪽에 적당한 여백을 줘서 가로선이 전체 테두리까지 닿지 않도록 설정
    },
  };
  
  export default styles;
  