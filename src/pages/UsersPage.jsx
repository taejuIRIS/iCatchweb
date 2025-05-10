// src/pages/UsersPage.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://ceprj.gachon.ac.kr:60004/api/admin/users");
      console.log("📥 사용자 데이터:", res.data.data); // 응답 구조 확인

      if (res.data.success && Array.isArray(res.data.data)) {
        const usersWithPassword = res.data.data.map((user, index) => ({
          ...user,
          password: "0000", // 더미 패스워드
          tempId: index + 1,
        }));
        setUsers(usersWithPassword);
      } else {
        alert("사용자 정보를 불러오는 데 실패했습니다.");
      }
    } catch (err) {
      alert("서버 연결 실패: " + err.message);
    }
  };

  const handleDelete = async (userId) => {
    if (!userId) {
      alert("잘못된 사용자 ID입니다. 삭제할 수 없습니다.");
      return;
    }

    const confirmed = window.confirm("정말로 이 사용자를 삭제하시겠습니까?");
    if (!confirmed) return;

    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("로그인 토큰이 없습니다. 다시 로그인 해주세요.");
      return;
    }

    try {
      const res = await axios.delete(
        `http://ceprj.gachon.ac.kr:60004/api/admin/users?userId=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        alert("삭제 성공: " + res.data.message);
        setUsers(users.filter((user) => user.userId !== userId));
      } else {
        alert("삭제 실패: " + (res.data.message || "알 수 없는 오류"));
      }
    } catch (err) {
      alert("서버 오류: " + err.message);
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
              <Td>{user.tempId}</Td>
              <Td>{user.userNickname}</Td>
              <Td>{user.email}</Td>
              <Td>{user.password}</Td>
              <Td>
                <DeleteButton
                  onClick={() => {
                    console.log("🗑 삭제 시도 대상:", user);
                    handleDelete(user.userId);
                  }}
                >
                  ✔ Delete
                </DeleteButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default UsersPage;

// ---------- Styled Components ----------
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