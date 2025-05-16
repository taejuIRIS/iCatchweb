import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const MonitoringPage = () => {
  const [devices, setDevices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  const totalPages = Math.ceil(devices.length / itemsPerPage);
  const currentData = devices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          {currentData.map((device) => (
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

      {totalPages > 1 && (
        <Pagination>
          <PageButton
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            ◀
          </PageButton>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <PageButton
              key={num}
              onClick={() => setCurrentPage(num)}
              active={num === currentPage}
            >
              {num}
            </PageButton>
          ))}
          <PageButton
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            ▶
          </PageButton>
        </Pagination>
      )}
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
