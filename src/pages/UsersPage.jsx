// src/pages/UsersPage.jsx
import React from "react";
import styled from "styled-components";

const dummyUsers = [
  { id: 1, nickname: "김태주", email: "xown0123@gmail.com", password: "●●●" },
  { id: 2, nickname: "태주", email: "xown0124@gmail.com", password: "●●●" },
  { id: 3, nickname: "태주태", email: "xown0125@gmail.com", password: "●●●●●●" },
  { id: 4, nickname: "김수림", email: "tnfla2@gamail.com", password: "●●●●●●●●●" },
  { id: 5, nickname: "변승준", email: "tmdwnsl@gmail.com", password: "●●●●●" },
  { id: 6, nickname: "강태훈", email: "xognsxogns@gmail.com", password: "●●" },
  { id: 7, nickname: "최서륜", email: "chltjfbs@gmail.com", password: "●●●●●●●●" },
  { id: 8, nickname: "김정훈", email: "gpgpglaemfek@gmail.com", password: "●" },
];

const UsersPage = () => {
  return (
    <>
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
            {dummyUsers.map((user) => (
              <tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.nickname}</Td>
                <Td>{user.email}</Td>
                <Td>{user.password}</Td>
                <Td>
                  <DeleteButton>
                    <span>✔ Delete</span>
                  </DeleteButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Wrapper>
    </>
  );
};

export default UsersPage;

// 스타일 컴포넌트
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
