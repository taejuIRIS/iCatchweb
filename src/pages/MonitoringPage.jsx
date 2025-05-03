// src/pages/MonitoringPage.jsx
import React from "react";
import styled from "styled-components";

const dummyDevices = [
  { id: 1, name: "안방", nickname: "김태주", ip: "••••••01", status: "블랙스크린카메라" },
  { id: 2, name: "주방", nickname: "김태주", ip: "••••••02", status: "블랙스크린" },
  { id: 3, name: "거실", nickname: "김태주", ip: "••••••03", status: "카메라 ON" },
  { id: 4, name: "집", nickname: "김수림", ip: "••••••04", status: "카메라 OFF" },
  { id: 5, name: "안방", nickname: "변승준", ip: "••••••05", status: "카메라 ON" },
];

const MonitoringPage = () => {
  return (
    <>
      <Wrapper>
        <Title>디바이스 모니터링</Title>
        <Table>
          <thead>
            <tr>
              <Th>DEVICE ID</Th>
              <Th>CAM NAME</Th>
              <Th>NICKNAME</Th>
              <Th>IP</Th>
              <Th>STATUS</Th>
            </tr>
          </thead>
          <tbody>
            {dummyDevices.map((device) => (
              <tr key={device.id}>
                <Td>{device.id}</Td>
                <Td>{device.name}</Td>
                <Td>{device.nickname}</Td>
                <Td>{device.ip}</Td>
                <Td>{device.status}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Wrapper>
    </>
  );
};

export default MonitoringPage;

// 스타일 컨트롤
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
