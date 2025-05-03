import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import styled from "styled-components";

const AIReports = () => {
  const data = [
    { name: "pet", confidence: 82 },
    { name: "person", confidence: 91 },
    { name: "gesture", confidence: 88 },
  ];

  const colors = {
    pet: "#4F80FF",
    person: "#F97316",
    gesture: "#22D3EE",
  };

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 30, left: 20, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} unit="%" />
          <Tooltip />
          <Bar dataKey="confidence" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[entry.name]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <Label>클래스별 신뢰도 평균</Label>
    </ChartContainer>
  );
};

export default AIReports;

const ChartContainer = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 400px;
  min-height: 360px; // 맞춰줌
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;


const Label = styled.p`
  text-align: center;
  font-size: 16px;
  color: #333;
  margin-top: 1rem;
`;
