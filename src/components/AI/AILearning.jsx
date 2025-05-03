import React, { useState } from "react";
import styled from "styled-components";

const AILearning = ({ onFinish }) => {
  const [model, setModel] = useState("yolov8n");
  const [batchSize, setBatchSize] = useState("8");
  const [imageSize, setImageSize] = useState(640);
  const [epoch, setEpoch] = useState("100");
  const [modelName, setModelName] = useState("EyeCatch");
  const [isTraining, setIsTraining] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleTraining = () => {
    setIsTraining(true);
    setTimeout(() => {
      setIsTraining(false);
      setIsComplete(true);

      const newModel = {
        no: Date.now(),
        name: modelName,
        date: new Date().toISOString().split("T")[0],
        version: `v${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}`,
      };

      const versions = JSON.parse(localStorage.getItem("aiVersions") || "[]");
      versions.push(newModel);
      localStorage.setItem("aiVersions", JSON.stringify(versions));
    }, 3000);
  };

  const handleFinish = () => {
    setIsComplete(false);
    onFinish?.();
  };

  return (
    <Container>
      <FormSection>
        <Row>
          <Field>
            <Label>모델 선택</Label>
            <Select value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="yolov8n">yolov8n</option>
              <option value="yolov8s">yolov8s</option>
            </Select>
            <SubLabel>yolo 모델을 지정합니다.</SubLabel>
          </Field>

          <Field>
            <Label>이미지 크기 선택</Label>
            <RangeWrap>
              <span>320</span>
              <RangeInput
                type="range"
                min="320"
                max="960"
                step="64"
                value={imageSize}
                onChange={(e) => setImageSize(Number(e.target.value))}
              />
              <span>960</span>
            </RangeWrap>
            <SubLabel>학습 이미지 크기를 지정합니다.</SubLabel>
          </Field>

          <Field>
            <Label>학습 반복 횟수</Label>
            <Input value={epoch} onChange={(e) => setEpoch(e.target.value)} />
            <SubLabel>epoch 수를 지정합니다.</SubLabel>
          </Field>

          <Field>
            <Label>배치 사이즈</Label>
            <Select value={batchSize} onChange={(e) => setBatchSize(e.target.value)}>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="32">32</option>
            </Select>
            <SubLabel>batch 사이즈를 지정합니다.</SubLabel>
          </Field>

          <Field>
            <Label>모델 명</Label>
            <Input value={modelName} onChange={(e) => setModelName(e.target.value)} />
            <SubLabel>모델 명을 지정합니다.</SubLabel>
          </Field>
        </Row>

        <TrainButton onClick={handleTraining}>모델 학습</TrainButton>
      </FormSection>

      {isTraining && (
        <Modal>
          <ModalBox>
            <h2>모델 학습 중...</h2>
            <p>잠시만 기다려 주세요! 모델이 학습되는데 오래 시간이 걸립니다.</p>
          </ModalBox>
        </Modal>
      )}

      {isComplete && (
        <Modal>
          <ModalBox>
            <h2>모델 학습 완료되었습니다!</h2>
            <p>모델 학습 완료 및 자동 적용되어 교체되었습니다.</p>
            <ModalButton onClick={handleFinish}>Okay</ModalButton>
          </ModalBox>
        </Modal>
      )}
    </Container>
  );
};

export default AILearning;


const Container = styled.div`
  padding: 40px 80px;
`;

const FormSection = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 24px;
`;

const Field = styled.div`
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 6px;
`;

const SubLabel = styled.span`
  font-size: 14px;
  color: #757575;
  margin-top: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #cfd4dc;
  font-size: 16px;
  background: #ffffff;
  box-sizing: border-box;
`;

const Select = styled.select`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 1px solid #cfd4dc;
  font-size: 16px;
  background: #ffffff;
  box-sizing: border-box;
`;

const RangeWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const RangeInput = styled.input`
  flex: 1;
`;

const TrainButton = styled.button`
  width: 100%;
  background: #6b4eff;
  color: white;
  font-weight: bold;
  padding: 16px;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 12px;

  &:hover {
    background: #5b40df;
  }
`;

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  padding: 32px;
  border-radius: 16px;
  width: 400px;
  text-align: center;
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);

  h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 12px;
  }

  p {
    color: #475569;
  }
`;

const ModalButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background: #6b4eff;
  color: white;
  border-radius: 24px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #5b40df;
  }
`;
