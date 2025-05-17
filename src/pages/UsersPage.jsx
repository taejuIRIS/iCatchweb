import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/api/admin/users");
      console.log("📥 사용자 데이터:", res.data.data);

      if (res.data.success && Array.isArray(res.data.data)) {
        const usersWithPassword = res.data.data
          .filter((user) => user.email !== "admin@admin.com")
          .map((user) => ({
            ...user,
            password: "●●●●●●●●●",
          }));
        setUsers(usersWithPassword);
      } else {
        alert("사용자 정보를 불러오는 데 실패했습니다.");
      }
    } catch (err) {
      alert("서버 연결 실패: " + err.message);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("로그인 토큰이 없습니다. 다시 로그인 해주세요.");
      return;
    }

    try {
      const res = await axios.delete(
        `/api/admin/users?userId=${deleteTargetId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        alert("삭제 성공: " + res.data.message);
        setUsers(users.filter((user) => user.userId !== deleteTargetId));
      } else {
        alert("삭제 실패: " + (res.data.message || "알 수 없는 오류"));
      }
    } catch (err) {
      alert("서버 오류: " + err.message);
    } finally {
      setShowConfirm(false);
      setDeleteTargetId(null);
    }
  };

  return (
    <Wrapper>
      <Title>사용자 관리</Title>
      <Table>
        <thead>
          <tr>
            <Th>USERID</Th>
            <Th>NICKNAME</Th>
            <Th>EMAIL</Th>
            <Th>PASSWORD</Th>
            <Th>ACTION</Th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <Td>{user.userId ?? "-"}</Td>
              <Td>{user.userNickname}</Td>
              <Td>{user.email}</Td>
              <Td>{user.password}</Td>
              <Td>
                <DeleteButton
                  onClick={() => {
                    setDeleteTargetId(user.userId);
                    setShowConfirm(true);
                  }}
                >
                  ✔ Delete
                </DeleteButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showConfirm && (
        <ConfirmBackdrop>
          <ConfirmModal>
            <PopupTitle>사용자를 삭제하시겠습니까?</PopupTitle>
            <PopupDesc>확인을 누르시면 되돌릴 수 없습니다.</PopupDesc>
            <ModalActions>
              <CancelButton onClick={() => setShowConfirm(false)}>Cancel</CancelButton>
              <ConfirmButton onClick={handleDelete}>Yes</ConfirmButton>
            </ModalActions>
          </ConfirmModal>
        </ConfirmBackdrop>
      )}
    </Wrapper>
  );
};

export default UsersPage;
const Wrapper = styled.div`
  padding: 40px 80px;
  background: #fff;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
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
`;

const DeleteButton = styled.button`
  background-color: #c7b8ff;
  border: none;
  padding: 6px 14px;
  border-radius: 8px;
  color: #6b4eff;
  font-weight: bold;
  cursor: pointer;
  font-size: 13px;
  &:hover {
    background-color: #b8aaff;
  }
`;

const ConfirmBackdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

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
