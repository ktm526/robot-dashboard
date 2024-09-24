import React, { useState, useRef, useEffect } from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#2B2633',
    color: 'white',
    padding: '20px',
  },
  contentContainer: {
    display: 'flex',
    flex: 1,
    marginBottom: '20px',
    position: 'relative', // 추가
  },
  canvasContainer: {
    flex: 3,
    border: '1px solid #59575E',
    borderRadius: '6px',
    backgroundColor: '#2B2633',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // 추가
  },
  controlPanelOverlay: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '10px',
    borderRadius: '8px',
  },
  dropdownMenu: {
    backgroundColor: 'rgba(89, 87, 94, 0.7)',
    color: 'white',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #59575E',
    fontSize: '14px',
    marginBottom: '10px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#3A3F51',
    borderRadius: '4px',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '10px',
    fontSize: '14px',
  },
  bottomControls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #59575E',
    padding: '10px 0',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
  },
};

const Simulation = () => {
  const [selectedMap, setSelectedMap] = useState('');
  const [mapList, setMapList] = useState([]);
  const [mapImage, setMapImage] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchMapList = async () => {
      try {
        const serverIp = process.env.REACT_APP_NODE_SERVER_IP;
        const response = await fetch(`${serverIp}/maps`);
        if (response.ok) {
          const maps = await response.json();
          setMapList(maps);
          if (maps.length > 0) {
            setSelectedMap(maps[0]);
            loadMapImage(maps[0]); // 기본 맵 로드
          }
        } else {
          console.error('Failed to fetch map list');
        }
      } catch (error) {
        console.error('Error fetching map list:', error);
      }
    };

    fetchMapList();
  }, []);

  const handleMapChange = async (event) => {
    const selectedMapName = event.target.value;
    setSelectedMap(selectedMapName);
    loadMapImage(selectedMapName);
  };

  const loadMapImage = async (mapName) => {
    try {
      const serverIp = process.env.REACT_APP_NODE_SERVER_IP;
      const response = await fetch(`${serverIp}/uploads/${mapName}`);
      if (response.ok) {
        const mapData = await response.json();
        const img = new Image();
        img.src = `${serverIp}/uploads/${mapData.imageFileName}`;
        img.onload = () => {
          setMapImage({ image: img, nodes: mapData.nodes, edges: mapData.edges });
          drawMap(img, mapData.nodes, mapData.edges);
        };
      } else {
        console.error('Failed to load map data');
      }
    } catch (error) {
      console.error('Error loading map data:', error);
    }
  };

  const drawMap = (img, nodes, edges) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (img) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;

      edges.forEach((edge) => {
        ctx.beginPath();
        ctx.moveTo(edge.start.x * canvas.width, edge.start.y * canvas.height);
        ctx.lineTo(edge.end.x * canvas.width, edge.end.y * canvas.height);
        ctx.stroke();
      });

      nodes.forEach((node) => {
        ctx.fillStyle = node.color || 'red';
        ctx.beginPath();
        ctx.arc(node.x * canvas.width, node.y * canvas.height, 5, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
  };

  const handleAddRobot = () => {
    console.log('Add Robot');
  };

  const handlePlay = () => {
    console.log('Play simulation');
  };

  const handleBack = () => {
    console.log('Go back');
  };

  const handleSpeedChange = (event) => {
    console.log(`Change speed to: ${event.target.value}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>시뮬레이션</h1> {/* 새로운 제목 추가 */}
      <div style={styles.contentContainer}>
        <div style={styles.canvasContainer}>
          <canvas ref={canvasRef} width="1200" height="800" style={{ backgroundColor: '#3A3F51' }}></canvas>
          <div style={styles.controlPanelOverlay}>
            <select style={styles.dropdownMenu} value={selectedMap} onChange={handleMapChange}>
              {mapList.map((mapName, index) => (
                <option key={index} value={mapName}>
                  {mapName}
                </option>
              ))}
            </select>
            <button style={styles.button} onClick={handleAddRobot}>
              Add Robot
            </button>
          </div>
        </div>
      </div>
      <div style={styles.bottomControls}>
        <button style={styles.button} onClick={handleBack}>
          Back
        </button>
        <button style={styles.button} onClick={handlePlay}>
          Play
        </button>
        <select style={styles.dropdownMenu} onChange={handleSpeedChange}>
          <option value="1x">1x Speed</option>
          <option value="1.5x">1.5x Speed</option>
          <option value="2x">2x Speed</option>
        </select>
      </div>
    </div>
  );
};

export default Simulation;



//세팅 값 읽어오기
//- 로봇 정보들 ()
//시뮬레이션
//- 뒤로가기, 빨리감기, 등등
//인풋
//- xml 파일(맵, 로봇{스타트지점, 속도}, 태스크{})
//- 
//아웃풋? 
//- 구동 시간 / 태스크

//-테스트 맵: 컨테이너 싣는 곧, 컨테이너 내리는 곳(각각 로봇 대수만큼), 충전 스테이션 3개, 
//- 로봇 3대
//- 그리드는 적당히 촘촘하게 (50x50)