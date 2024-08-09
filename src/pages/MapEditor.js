import React, { useState, useRef, useEffect } from 'react';
import { Button, Modal, Box, Typography, Stepper, Step, StepLabel, StepContent } from '@mui/material';
import { useDropzone } from 'react-dropzone';

const steps = [
  'Step 1: 기본 정보 입력',
  'Step 2: 맵 설정',
  'Step 3: 확인 및 완료'
];

const MapEditor = () => {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [smapFile, setSmapFile] = useState(null);
  const [smapData, setSmapData] = useState(null);
  const canvasRef = useRef(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setBackgroundImage(null);
    setSmapFile(null);
    setSmapData(null);
    handleClose();
  };

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach(file => {
      if (file.type.startsWith('image/')) {
        setBackgroundImage(URL.createObjectURL(file));
      } else if (file.name.endsWith('.smap')) {
        const reader = new FileReader();
        reader.onload = () => {
          const text = reader.result;
          const data = JSON.parse(text);
          setSmapData(data);
        };
        reader.readAsText(file);
        setSmapFile(file);
      }
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/json': ['.smap']
    }
  });

  useEffect(() => {
    if (activeStep === 1 && smapData) {
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext('2d');

        // 캔버스 넓이를 1200px로 설정
        canvas.width = 1200;

        // smap 데이터에 따른 높이 계산
        const { header } = smapData;
        const { minPos, maxPos } = header;
        const aspectRatio = (maxPos.y - minPos.y) / (maxPos.x - minPos.x);
        canvas.height = canvas.width * aspectRatio;

        if (backgroundImage) {
          const img = new Image();
          img.src = backgroundImage;
          img.onload = () => {
            context.drawImage(img, 0, 0, canvas.width, canvas.height);

            // smapData를 사용하여 캔버스에 그리기
            smapData.normalPosList.forEach(pos => {
              const x = (pos.x - minPos.x) / (maxPos.x - minPos.x) * canvas.width;
              const y = canvas.height - (pos.y - minPos.y) / (maxPos.y - minPos.y) * canvas.height;
              context.fillStyle = 'red';
              context.fillRect(x, y, 2, 2);
            });
          };
        }
      }
    }
  }, [activeStep, backgroundImage, smapData]);

  return (
    <div style={{ padding: '20px', color: 'white', backgroundColor: '#2B2633', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 600 }}>맵 편집하기</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          style={{ backgroundColor: '#E7E964', color: '#293351', fontSize: '21px', width: '180px' }}
        >
          새로 생성하기
        </Button>
      </div>
      {/* 모달 창 */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        BackdropProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)' // 블러 효과 추가
          }
        }}
      >
        <Box sx={{
          overflowY: 'scroll',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: '#2C2A35',
          color: 'white',
          boxShadow: 24,
          p: 4,
          borderRadius: '10px'
        }}>
          <Typography id="modal-title" variant="h6" component="h2" style={{ marginBottom: '20px', color: 'white' }}>
            맵 생성
          </Typography>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      color: '#E7E964',
                      '&.Mui-completed': {
                        color: '#E7E964'
                      },
                      '&.Mui-active': {
                        color: '#E7E964'
                      },
                      '& .MuiStepIcon-text': {
                        fill: 'black'  // 인디케이터 안쪽 글씨를 검은색으로 설정
                      }
                    }
                  }}
                >
                  <span style={{ color: 'white' }}>{label}</span>
                </StepLabel>
                <StepContent>
                  {index === 0 && (
                    <div>
                      <Typography style={{ marginBottom: '20px', color: 'white' }}>배경 이미지와 .smap 파일을 업로드하세요.</Typography>
                      <div {...getRootProps()} style={{ border: '2px dashed #E7E964', padding: '20px', borderRadius: '10px', textAlign: 'center', marginBottom: '20px' }}>
                        <input {...getInputProps()} />
                        <Typography style={{ color: 'white' }}>여기로 파일을 드래그하거나 클릭하여 업로드하세요.</Typography>
                      </div>
                      {backgroundImage && <Typography style={{ marginTop: '10px' }}>배경 이미지: {backgroundImage.name}</Typography>}
                      {smapFile && <Typography style={{ marginTop: '10px' }}>.smap 파일: {smapFile.name}</Typography>}
                    </div>
                  )}
                  {index === 1 && (
                    <div>
                      <Typography style={{ marginBottom: '20px', color: 'white' }}>배경 이미지 위에 .smap 파일 데이터를 표시합니다.</Typography>
                      <canvas ref={canvasRef} style={{ width: '100%', border: '1px solid #E7E964', borderRadius: '10px' }} />
                    </div>
                  )}
                  {index === 2 && (
                    <Typography style={{ marginBottom: '20px', color: 'white' }}>확인 및 완료 내용은 여기에...</Typography>
                  )}
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{
                          mt: 1,
                          mr: 1,
                          backgroundColor: '#E7E964',
                          color: '#293351'
                        }}
                      >
                        {index === steps.length - 1 ? '완료' : '다음'}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{
                          mt: 1,
                          mr: 1,
                          color: 'white',
                          borderColor: 'white',
                          border: '1px solid'
                        }}
                      >
                        뒤로
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Box sx={{ mt: 2, mb: 1 }}>
              <Typography style={{ color: 'white' }}>모든 단계를 완료했습니다.</Typography>
              <Button ß
                onClick={handleReset}
                sx={{
                  mt: 1,
                  mr: 1,
                  backgroundColor: '#E7E964',
                  color: '#293351'
                }}
              >
                처음부터 다시 시작
              </Button>
            </Box> 
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default MapEditor;
