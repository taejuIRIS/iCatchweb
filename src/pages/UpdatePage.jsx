// src/pages/UpdatePage.jsx
import React from "react";
import styled from "styled-components";

const dummyUpdates = [
  { id: 1, nickname: "ADMIN", date: "2025.03.18", version: "0.1v" },
  { id: 2, nickname: "ADMIN", date: "2025.03.23", version: "0.2v" },
  { id: 3, nickname: "ADMIN", date: "2025.03.29", version: "0.3v" },
  { id: 4, nickname: "ADMIN", date: "2025.03.31", version: "0.4v" },
];

export default function UpdatePage() {
  return (
    <>
      <Wrapper>
        <Title>업데이트 관리</Title>
        <Table>
          <thead>
            <tr>
              <Th>NO</Th>
              <Th>NICKNAME</Th>
              <Th>UPDATE DATE</Th>
              <Th>VERSION</Th>
            </tr>
          </thead>
          <tbody>
            {dummyUpdates.map((row) => (
              <tr key={row.id}>
                <Td>{row.id}</Td>
                <Td>{row.nickname}</Td>
                <Td>{row.date}</Td>
                <Td>{row.version}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Wrapper>
    </>
  );
}

// 스타일 컴포넌트 정의
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
  font-size: 14px;
  color: #242c31;
`;
