// Updated AIPage.jsx (레이아웃만 피그마 기준에 맞춰 정리, 색상은 그대로)

import React from "react";
import { useNavigate } from "react-router-dom";
import AILearning from "../components/AI/AILearning";
import ModelChange from "../components/AI/ModelChange";
import AIReports from "../components/AI/AIReports";
import AiVersion from "../components/AI/AIVersions";
import styled from "styled-components";

const AIPage = () => {
  const navigate = useNavigate();

  const handleModelChangeComplete = () => {
    navigate("/ai");
  };

  return (
    <Wrapper>
      <Section>
        <SectionTitle>AI 학습</SectionTitle>
        <SubText>
          YOLO 모델의 파라미터 설정과 학습을 통해 객체 탐지에 최적화된 모델을
          생성합니다.
        </SubText>
        <AILearning />
      </Section>

      <Section>
        <SectionTitle>성능 평가 그래프</SectionTitle>
        <SubText>
          현재까지 학습된 모델의 성능 평가 그래프를 확인하여 비교 분석하고 모델을 다운로드 및 삭제할 수 있습니다.
        </SubText>
        <AIReports />
      </Section>

      
        <Section>
        <SectionTitle>모델 교체</SectionTitle>
        <SubText>IP 할당 후 해당 기기에서 현재 사용 중인 모델을 선택한 모델로 교체합니다.</SubText>
        <ModelChange onNavigateToVersion={handleModelChangeComplete} />
       </Section>



       
      
    </Wrapper>
  );
};

export default AIPage;

// --- styled-components ---
const Wrapper = styled.div`
  background-color: white;
`;

const Section = styled.section`
  padding: 40px 80px;
  margin-bottom: 60px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #242c31;
  margin-bottom: 4px;
`;

const SubText = styled.p`
  color: #757575;
  font-size: 16px;
  margin-bottom: 16px;
`;
const FlexSection = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  padding: 0 140px;
  margin-bottom: 60px;
  flex-wrap: wrap;
`;

const Column = styled.div`
  flex: 1 1 440px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;