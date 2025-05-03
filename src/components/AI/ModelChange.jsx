import React, { useState } from "react";
import styled from "styled-components";

const ModelChange = ({ onNavigateToVersion }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      setShowConfirmModal(true);
    } else {
      alert("모델 파일을 먼저 선택해 주세요.");
    }
  };

  const handleConfirmYes = () => {
    setShowConfirmModal(false);
    setTimeout(() => {
      setShowCompleteModal(true);
    }, 1500);
  };

  const handleCompleteOkay = () => {
    setShowCompleteModal(false);
    onNavigateToVersion?.();
  };

  return (
    
    <OuterContainer>
      <SubText>현재 사용 중인 모델을 업로드한 모델로 교체합니다.</SubText>
      <Label htmlFor="file-upload">
        <UploadArea>
          <UploadIcon>⬆</UploadIcon>
        </UploadArea>
      </Label>
      <HiddenInput
        id="file-upload"
        type="file"
        accept=".pt"
        onChange={handleFileChange}
      />

      <ModelButton onClick={handleUploadClick}>모델 교체</ModelButton>

      {showConfirmModal && (
        <Modal>
          <ModalBox>
            <p>해당 파일로 모델을 교체하시겠습니까?</p>
            <FileName>{selectedFile?.name}</FileName>
            <ModalButtons>
              <CancelBtn onClick={() => setShowConfirmModal(false)}>Cancel</CancelBtn>
              <ConfirmBtn onClick={handleConfirmYes}>Yes</ConfirmBtn>
            </ModalButtons>
          </ModalBox>
        </Modal>
      )}

      {showCompleteModal && (
        <Modal>
          <ModalBox>
            <p>모델 교체 완료되었습니다!</p>
            <ConfirmBtn onClick={handleCompleteOkay}>Okay</ConfirmBtn>
          </ModalBox>
        </Modal>
      )}
    </OuterContainer>
  );
};

export default ModelChange;

// Styled
const OuterContainer = styled.div`
  background: #fff;
  border-radius: 1.25rem;
  padding: 2.5rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
  min-height: 360px; // 최소 높이만 지정
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;


const Label = styled.label`
  cursor: pointer;
`;

const UploadArea = styled.div`
  width: 100%;
  height: 160px;
  border: 2px dashed #6b4eff;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const UploadIcon = styled.div`
  font-size: 2rem;
  color: #b596f3;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ModelButton = styled.button`
  background-color: #6b4eff;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 9999px;
  font-weight: bold;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #5b40df;
  }
`;

// Modal styles
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 300px;
  text-align: center;
`;

const FileName = styled.p`
  margin: 0.5rem 0 1.5rem;
  color: #7c3aed;
  font-weight: bold;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: space-around;
`;

const CancelBtn = styled.button`
  border: 2px solid #ccc;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  cursor: pointer;
`;

const ConfirmBtn = styled.button`
  background-color: #6b4eff;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 9999px;
  font-weight: bold;
  cursor: pointer;
`;

const SubText = styled.p`
  color: #757575;
  font-size: 16px;
  margin-bottom: 24px;
`;
