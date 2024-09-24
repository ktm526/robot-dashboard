const styles = {
    container: {
      border: '2px solid #59575E',
      borderRadius: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      boxSizing: 'border-box',
      overflow:'hidden',
      height: '100%'
    },
    header: {
        width: '100%',
        height: '28px',
        backgroundColor: '#59575E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Pretendard, sans-serif',
      fontWeight: '600',
      fontSize: '14px',
      },
    imageContainer: {
      border: '2px solid #59575E',
      borderRadius: '10px',
      padding: '10px',
      margin: '20px',
      width: 'calc(100% - 60px)',
      display: 'flex',
      justifyContent: 'center',
    },
    image: {
      width: 'calc(100% - 40px)', // 테두리로부터 10px 마진을 둔 이미지 폭
      height: '480px',
    },
    errorContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', // 내용물을 왼쪽으로 붙임
        border: '2px solid red',
        borderRadius: '10px',
        padding: '10px',
        backgroundColor: '#2B2633',
        color: 'white', // 글씨 색상 흰색으로 설정
        width: 'calc(100% - 60px)', // 테두리로부터 10px 마진을 둔 폭
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', // 박스 그림자 추가
        marginTop: '0px',
        marginBottom: '20px',
        
    },
    successContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start', // 내용물을 왼쪽으로 붙임
      border: '2px solid green',
      borderRadius: '10px',
      padding: '10px',
      backgroundColor: '#2B2633',
      color: 'white', // 글씨 색상 흰색으로 설정
      width: 'calc(100% - 60px)', // 테두리로부터 10px 마진을 둔 폭
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', // 박스 그림자 추가
      marginTop: '0px',
      marginBottom: '20px',
    },
    errorIcon: {
        width: '16px',
        height: '16px',
        marginRight: '20px',
        fill: 'red', // 오류 아이콘 색상
      },
      successIcon: {
        width: '16px',
        height: '16px',
        marginRight: '20px',
        fill: 'green', // 성공 아이콘 색상
      },
    message: {
        fontFamily: 'Pretendard, sans-serif',
        fontSize:'14px',
        fontWeight: '600',
    },
  };
  
  export default styles;
  