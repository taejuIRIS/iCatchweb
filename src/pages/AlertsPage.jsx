import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import AlertsForm from "../components/AlertsForm";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("http://ceprj.gachon.ac.kr:60004/api/admin/notifications");
      if (res.data.success) {
        setNotifications(res.data.data);
      } else {
        alert("알림 불러오기 실패: " + res.data.message);
      }
    } catch (error) {
      console.error("알림 조회 에러:", error);
    }
  };

  const handleSend = (newNotification) => {
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const totalPages = Math.ceil(notifications.length / itemsPerPage);
  const currentData = notifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
              <Th>USER ID</Th>
              <Th>TYPE</Th>
              <Th>TITLE</Th>
              <Th>DATE</Th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((n, index) => (
              <tr key={index}>
                <Td>{n.userId}</Td>
                <Td>{n.notificationType}</Td>
                <Td>{n.title}</Td>
                <Td>{formatDate(n.createdAt)}</Td>
              </tr>
            ))}
          </tbody>
        </Table>

        {totalPages > 1 && (
          <Pagination>
            <PageButton onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}>
              ◀
            </PageButton>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <PageButton key={num} onClick={() => setCurrentPage(num)} active={num === currentPage}>
                {num}
              </PageButton>
            ))}
            <PageButton onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
              ▶
            </PageButton>
          </Pagination>
        )}
      </Wrapper>

      {showForm && <AlertsForm onClose={() => setShowForm(false)} onSend={handleSend} />}
    </>
  );
}

function formatDate(dateString) {
  const d = new Date(dateString);
  return d.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// 스타일 정의는 기존과 동일하게 유지
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
const Pagination = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 8px;
`;
const PageButton = styled.button`
  padding: 6px 12px;
  border: none;
  background: ${(props) => (props.active ? "#6b4eff" : "#eee")};
  color: ${(props) => (props.active ? "white" : "#333")};
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #6b4eff;
    color: white;
  }
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
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
