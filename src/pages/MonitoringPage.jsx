// src/pages/MonitoringPage.jsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const MonitoringPage = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get("http://ceprj.gachon.ac.kr:60004/api/device/monitoring");
        if (response.data.success) {
          setDevices(response.data.data);
        } else {
          console.error("데이터 조회 실패:", response.data.message);
        }
      } catch (error) {
        console.error("API 요청 실패:", error);
      }
    };

    fetchDevices();
  }, []);

  return (
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
          {devices.map((device) => (
            <tr key={device.deviceId}>
              <Td>{device.deviceId}</Td>
              <Td>{device.cameraName}</Td>
              <Td>{device.userName}</Td>
              <Td>{device.deviceIp}</Td>
              <Td>{device.deviceStatus ?? ""}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default MonitoringPage;

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
