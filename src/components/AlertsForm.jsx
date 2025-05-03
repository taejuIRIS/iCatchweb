// ✅ AlertsForm.jsx
import React, { useState } from "react";
import styled from "styled-components";

const AlertsForm = ({ onClose, onSend }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [target, setTarget] = useState("전체 사용자");
  const [showConfirm, setShowConfirm] = useState(false);

  const handleFinalSend = () => {
    const newNotification = {
      id: Date.now(),
      userId: 999,
      nickname: target,
      message: `${title ? title + ": " : ""}${content}`,
    };
    onSend?.(newNotification);
    onClose?.();
  };

  return (
    <Backdrop>
      <Modal>
        <Brand>
          <BlackText>i</BlackText>
          <PurpleText>Catch</PurpleText>
        </Brand>

        <SectionTitle>MESSAGE</SectionTitle>
        <Desc>메시지를 작성한 후 사용자들에게 메시지를 보내세요!</Desc>

        <FormGroup>
          <Label>제목</Label>
          <Input
            placeholder="Write your title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>메시지</Label>
          <Textarea
            placeholder="Write your content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Select value={target} onChange={(e) => setTarget(e.target.value)}>
            <option>전체 사용자</option>
          </Select>
        </FormGroup>

        <SendButton onClick={() => setShowConfirm(true)}>Send</SendButton>
      </Modal>

      {showConfirm && (
        <ConfirmBackdrop>
          <ConfirmModal>
            <PopupTitle>메시지를 전송하시겠습니까?</PopupTitle>
            <PopupDesc>확인을 누르시면 메시지 수정이 불가능합니다.</PopupDesc>
            <ModalActions>
              <CancelButton onClick={() => setShowConfirm(false)}>Cancel</CancelButton>
              <ConfirmButton onClick={handleFinalSend}>Yes</ConfirmButton>
            </ModalActions>
          </ConfirmModal>
        </ConfirmBackdrop>
      )}
    </Backdrop>
  );
};

export default AlertsForm;

// 💅 스타일 컴포넌트는 이전과 동일하며, Confirm 모달만 추가
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const Modal = styled.div`
  width: 640px;
  background: #e2dcff;
  border-radius: 30px;
  padding: 48px 40px 40px 40px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
`;

const Brand = styled.div`
  display: flex;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const BlackText = styled.span`
  color: #0f172a;
`;

const PurpleText = styled.span`
  color: #6b4eff;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #0f172a;
  margin-bottom: 6px;
`;

const Desc = styled.p`
  font-size: 15px;
  color: #475569;
  margin-bottom: 32px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #344053;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #cfd4dc;
  font-size: 16px;
  background: #ffffff;
  box-sizing: border-box;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #cfd4dc;
  font-size: 16px;
  background: #ffffff;
  resize: none;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  box-sizing: border-box;
`;

const SendButton = styled.button`
  width: 100%;
  background: #6b4eff;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  padding: 16px 0;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  &:hover {
    background: #5b40df;
  }
`;

const ConfirmBackdrop = styled(Backdrop)``;
const ConfirmModal = styled.div`
  background: #fff;
  padding: 32px;
  border-radius: 16px;
  text-align: center;
  min-width: 360px;
`;
const PopupTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 12px;
`;
const PopupDesc = styled.p`
  font-size: 14px;
  color: #667084;
  margin-bottom: 24px;
`;
const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;
const CancelButton = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 9999px;
  background: white;
  border: 1px solid #d0d5dd;
  color: #344054;
  font-weight: 600;
`;
const ConfirmButton = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 9999px;
  background: #6b4eff;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
