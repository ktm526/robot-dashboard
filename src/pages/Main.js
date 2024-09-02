import React, { useState, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { socketAtom, clientsAtom } from '../atoms/socketAtom';
import { commonStyles } from '../styles';

const styles = {
  // 기존 스타일 정의는 그대로 유지
  container: {
    backgroundColor: '#2B2633',
    minHeight: '100vh',
    color: 'white',
    padding: '20pt 40pt',
    boxSizing: 'border-box',
  },
  ...commonStyles,
  tableContainer: {
    width: '100%',
    maxWidth: '100%',
    border: '1pt solid #59575E',
    borderRadius: '6pt',
    borderCollapse: 'separate',
    borderSpacing: '0',
    overflow: 'hidden',
    marginBottom: '20pt',
  },
  tableHeader: {
    backgroundColor: '#59575E',
    color: 'DarkGray',
    height: '20px',
  },
  tableHeaderCell: {
    padding: '5pt 10pt',
    textAlign: 'middle',
    fontSize: '10pt',
  },
  tableRow: {
    position: 'relative',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, height 0.3s ease',
    backgroundColor: 'transparent',
    height: '30pt',
    overflow: 'hidden',
    textAlign: 'middle',
  },
  tableRowExpanded: {
    backgroundColor: '#59575E',
    height: 'auto',
  },
  tableCell: {
    padding: '5pt',
    textAlign: 'center',
    borderBottom: '1pt solid #59575E',
    fontSize: '10pt',
  },
  hiddenContent: {
    paddingTop: '5pt',
    paddingBottom: '5pt',
    display: 'none',
  },
  visibleContent: {
    display: 'block',
  },
  expandIcon: {
    position: 'absolute',
    right: '5pt',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
  },
  noClientsMessage: {
    padding: '10pt',
    textAlign: 'center',
    backgroundColor: '#59575E',
    borderRadius: '10pt',
    marginTop: '20pt',
    fontFamily: 'Pretendard, sans-serif',
    fontWeight: '600',
    fontSize: '12pt',
  },
  canvasContainer: {
    position: 'relative',
    marginTop: '20pt',
    border: '1pt solid #59575E',
    borderRadius: '6pt',
    overflow: 'hidden',
    width: '1200px',
    height: '800px',
    backgroundColor: '#2B2633',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '10pt',
    right: '10pt',
    zIndex: 1,
    backgroundColor: 'rgba(89, 87, 94, 0.7)',
    color: 'white',
    padding: '5pt',
    borderRadius: '4pt',
    border: '1pt solid #59575E',
    fontSize: '10pt',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  },
  subtitle: {
    marginTop: '30pt',
    fontSize: '14pt',
  },
  title: {
    fontSize: '18pt',
    marginBottom: '20pt',
  },
  triangleCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
  },
};

const Main = () => {
  const [clients, setClients] = useAtom(clientsAtom);
  const [socket] = useAtom(socketAtom);
  const [expandedRows, setExpandedRows] = useState({});
  const [selectedMap, setSelectedMap] = useState('');
  const [mapList, setMapList] = useState([]);
  const [mapImage, setMapImage] = useState(null);
  const triangleCanvasRef = useRef(null);
  const triangleData = useRef({});
  const isMapLoaded = useRef(false); // 맵 로드 상태를 추적

  useEffect(() => {
    const fetchMapList = async () => {
      try {
        const serverIp = process.env.REACT_APP_NODE_SERVER_IP;
        const response = await fetch(`${serverIp}/maps`);
        if (response.ok) {
          const maps = await response.json();
          setMapList(maps);
          if (maps.length > 0) {
            const firstMap = maps[0];
            setSelectedMap(firstMap); // 첫 번째 맵을 선택
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
useEffect(() => {
  if (selectedMap) {
      handleMapChange({ target: { value: selectedMap } });  // selectedMap이 변경될 때마다 맵을 로드
  }
}, [selectedMap]);

  useEffect(() => {
    const serverIp = process.env.REACT_APP_NODE_SERVER_IP;

    if (Object.keys(clients).length === 0) {
      fetch(`${serverIp}/api/clients`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Connected clients:', data);
          setClients(data);
        })
        .catch((error) => {
          console.error('Error fetching client data:', error);
        });
    }

    socket.on('clientUpdate', (updatedClients) => {
      console.log('Received updated clients:', updatedClients);
      setClients(updatedClients);
    });

    socket.on('updateTriangle', (data) => {
      if (data && data.socketId) {
        console.log('Received triangle data:', data);
        triangleData.current[data.socketId] = data;

        // 맵이 로드된 이후에만 삼각형을 그리도록 합니다.
        if (isMapLoaded.current) {
          drawMapAndTriangles(); 
        }
      } else {
        console.warn('Received triangle data without socketId or data is undefined:', data);
      }
    });

    return () => {
      socket.off('clientUpdate');
      socket.off('updateTriangle');
    };
  }, [socket, clients, setClients]);

  const toggleRow = (key) => {
    setExpandedRows((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleMapChange = async (event) => {
    const selectedMapName = event.target.value || event.target.value;
    setSelectedMap(selectedMapName);
    isMapLoaded.current = false; // 맵 로드가 시작되었으므로 상태를 false로 설정

    try {
      const serverIp = process.env.REACT_APP_NODE_SERVER_IP;
      const response = await fetch(`${serverIp}/uploads/${selectedMapName}`);
      if (response.ok) {
        const mapData = await response.json();
        loadMapImage(mapData);  // 로드된 맵 데이터를 처리
      } else {
        console.error('Failed to load map data');
      }
    } catch (error) {
      console.error('Error loading map data:', error);
    }
};

  const loadMapImage = (mapData) => {
    const img = new Image();
    img.src = `${process.env.REACT_APP_NODE_SERVER_IP}/uploads/${mapData.imageFileName}`;

    img.onload = () => {
      setMapImage({ image: img, nodes: mapData.nodes, edges: mapData.edges });
      isMapLoaded.current = true; // 맵이 로드되었으므로 상태를 true로 설정
      drawMapAndTriangles();
    };
  };

  const drawMapAndTriangles = () => {
    const triangleCanvas = triangleCanvasRef.current;
    const ctx = triangleCanvas.getContext('2d');

    ctx.clearRect(0, 0, triangleCanvas.width, triangleCanvas.height);

    if (mapImage && mapImage.image) {
      ctx.drawImage(mapImage.image, 0, 0, triangleCanvas.width, triangleCanvas.height);

      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;

      mapImage.edges.forEach((edge) => {
        ctx.beginPath();
        ctx.moveTo(edge.start.x * triangleCanvas.width, edge.start.y * triangleCanvas.height);
        ctx.lineTo(edge.end.x * triangleCanvas.width, edge.end.y * triangleCanvas.height);
        ctx.stroke();
      });

      mapImage.nodes.forEach((node) => {
        ctx.fillStyle = node.color || 'red';
        ctx.beginPath();
        ctx.arc(node.x * triangleCanvas.width, node.y * triangleCanvas.height, 5, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    if (triangleData.current && Object.keys(triangleData.current).length > 0) {
      Object.values(clients).forEach((client, index) => {
        const triangle = triangleData.current[client.socketId];
        if (triangle) {
          console.log(`Drawing triangle at (${triangle.x}, ${triangle.y}) with angle ${triangle.angle}`);

          ctx.save();
          ctx.translate(triangle.x, triangle.y);
          ctx.rotate(triangle.angle * Math.PI / 180);

          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.fillRect(-15, -20, 30, 30);
          ctx.fillStyle = 'white';
          ctx.fillText(index + 1, -5, 5);

          ctx.beginPath();
          ctx.moveTo(0, -20);
          ctx.lineTo(15, 20);
          ctx.lineTo(-15, 20);
          ctx.closePath();

          ctx.fillStyle = 'red';
          ctx.fill();
          ctx.restore();
        } else {
          console.log(`Triangle data for client ${client.socketId} is undefined`);
        }
      });
    } else {
      console.log('No triangle data available to draw');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>메인 모니터링</h1>
      <h2 style={styles.subtitle}>Robot Status</h2>

      {Object.keys(clients).length === 0 ? (
        <div style={styles.noClientsMessage}>연결된 로봇이 없습니다</div>
      ) : (
        <table style={styles.tableContainer}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={styles.tableHeaderCell}>No.</th>
              <th style={styles.tableHeaderCell}>Model</th>
              <th style={styles.tableHeaderCell}>S/N</th>
              <th style={styles.tableHeaderCell}>S/W ver</th>
              <th style={styles.tableHeaderCell}>FMS</th>
              <th style={styles.tableHeaderCell}>Mode</th>
              <th style={styles.tableHeaderCell}>Battery</th>
              <th style={styles.tableHeaderCell}>Location</th>
              <th style={styles.tableHeaderCell}>RunTime</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(clients).map((key, index) => (
              <React.Fragment key={key}>
                <tr
                  style={{
                    ...styles.tableRow,
                    ...(expandedRows[key] ? styles.tableRowExpanded : {}),
                  }}
                  onClick={() => toggleRow(key)}
                >
                  <td style={styles.tableCell}>{index + 1}</td>
                  <td style={styles.tableCell}>{clients[key].modelName}</td>
                  <td style={styles.tableCell}>{clients[key].serialNumber}</td>
                  <td style={styles.tableCell}>{clients[key].swVersion}</td>
                  <td style={styles.tableCell}>{clients[key].fms}</td>
                  <td style={styles.tableCell}>{clients[key].mode}</td>
                  <td style={styles.tableCell}>{clients[key].battery}</td>
                  <td style={styles.tableCell}>{clients[key].location}</td>
                  <td style={styles.tableCell}>{clients[key].runtime}</td>
                  <td style={styles.expandIcon}>{expandedRows[key] ? '▲' : '▼'}</td>
                </tr>
                {expandedRows[key] && (
                  <tr>
                    <td colSpan="10" style={styles.tableCell}>
                      <div style={expandedRows[key] ? styles.visibleContent : styles.hiddenContent}>
                        확장된 정보가 여기 표시됩니다.
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}

      <h2 style={styles.subtitle}>Information</h2>

      <div style={styles.canvasContainer}>
        <select style={styles.dropdownMenu} value={selectedMap} onChange={handleMapChange}>
          {mapList.map((mapName, index) => (
            <option key={index} value={mapName}>{mapName}</option>
          ))}
        </select>
        <canvas ref={triangleCanvasRef} id="triangleCanvas" width="1200" height="800" style={styles.triangleCanvas}></canvas>
      </div>
    </div>
  );
};

export default Main;
