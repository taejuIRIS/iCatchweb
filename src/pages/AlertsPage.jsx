// ✅ NotificationPage.jsx
import React, { useState } from "react";
import styled from "styled-components";
import AlertsForm from "../components/AlertsForm";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, userId: 1, nickname: "김태주", message: "3/18 활동로그가 완료됐어요!" },
    { id: 2, userId: 2, nickname: "태주", message: "3/18 활동로그가 완료됐어요!" },
    { id: 3, userId: 3, nickname: "태주태", message: "강아지가 위험 구역에 들어갔어요!" },
    { id: 4, userId: 4, nickname: "김수림", message: "고양이가 위험 구역에 들어갔어요!" },
    { id: 5, userId: 1, nickname: "김태주", message: "3/17 활동로그가 완료됐어요!" },
    { id: 6, userId: 2, nickname: "태주", message: "3/27 활동로그가 완료됐어요!" },
    { id: 7, userId: 4, nickname: "김수림", message: "3/16 활동로그가 완료됐어요!" },
    { id: 8, userId: 8, nickname: "김정훈", message: "아기가 위험해요! 119에 전화하세요!" }
  ]);
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleDelete = () => {
    setNotifications((prev) => prev.filter((n) => n.id !== selectedId));
    setSelectedId(null);
  };

  const handleSend = (newNotification) => {
    setNotifications((prev) => [newNotification, ...prev]);
  };

  return (
    <>
      <Wrapper>
        <Top>
          <Title>알림 관리</Title>
          <SendButton onClick={() => setShowForm(true)}>알림 전송하기</SendButton>
        </Top>

        <Table>
          <thead>
            <tr>
              <Th>USERID</Th>
              <Th>ACTION</Th>
              <Th>NICKNAME</Th>
              <Th>NOTIFICATIONS</Th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((n) => (
              <tr key={n.id}>
                <Td>{n.userId}</Td>
                <Td>
                  <DeleteBtn onClick={() => setSelectedId(n.id)}>
                    <img
                      src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/LOuxGbbzNT/u639h6kh_expires_30_days.png"
                      alt="delete"
                    />
                    Delete
                  </DeleteBtn>
                </Td>
                <Td>{n.nickname}</Td>
                <Td>{n.message}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Wrapper>

      {selectedId !== null && (
        <ModalBackdrop>
          <ModalBox>
            <PopupTitle>알림을 삭제하시겠습니까?</PopupTitle>
            <PopupMessage>알림 삭제 후 복구가 불가능합니다.</PopupMessage>
            <ModalActions>
              <CancelButton onClick={() => setSelectedId(null)}>Cancel</CancelButton>
              <ConfirmButton onClick={handleDelete}>Yes</ConfirmButton>
            </ModalActions>
          </ModalBox>
        </ModalBackdrop>
      )}

      {showForm && (
        <AlertsForm
          onClose={() => setShowForm(false)}
          onSend={handleSend}
        />
      )}
    </>
  );
}


// 💅 Styled components는 동일하게 유지됩니다


const Wrapper = styled.div`
  padding: 40px 80px;
  background: #fff;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
`;

const SendButton = styled.button`
  background: #c6c4ff;
  color: #6b4eff;
  font-weight: bold;
  padding: 12px 18px;
  border-radius: 48px;
  border: none;
  cursor: pointer;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: #6b4eff;
  color: white;
  font-weight: bold;
  padding: 12px;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
  color: #242c31;
`;

const DeleteBtn = styled.button`
  background-color: #c6c4ff;
  border: none;
  border-radius: 6px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  color: #6b4eff;
  font-weight: bold;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(52, 64, 83, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: #fff;
  padding: 32px;
  border-radius: 12px;
  min-width: 400px;
  text-align: center;
`;

const PopupTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const PopupMessage = styled.p`
  color: #667084;
  font-size: 14px;
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