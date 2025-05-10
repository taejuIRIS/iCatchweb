import React, { useState } from "react";
import styled from "styled-components";

const SIZE_OPTIONS = [320, 416, 512, 640, 800, 960];

const AILearning = ({ onFinish }) => {
  const [model, setModel] = useState("yolov8n");
  const [batchSize, setBatchSize] = useState("8");
  const [sizeIndex, setSizeIndex] = useState(3);
  const [epoch, setEpoch] = useState("100");
  const [modelName, setModelName] = useState("EyeCatch");
  const [isTraining, setIsTraining] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const imageSize = SIZE_OPTIONS[sizeIndex];

  const handleTraining = () => {
    setIsTraining(true);
    setTimeout(() => {
      setIsTraining(false);
      setIsComplete(true);

      const newModel = {
        no: Date.now(),
        name: modelName,
        date: new Date().toISOString().split("T")[0],
        version: `v${Math.floor(Math.random() * 10)}.${Math.floor(
          Math.random() * 10
        )}`,
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
      <FormBox>
        <FieldGrid>
          {/* 1행: 모델 선택, 이미지 크기 선택, 학습 반복 횟수 */}
          <Field>
            <Label>모델 선택</Label>
            <Select value={model} onChange={(e) => setModel(e.target.value)}>
              <option value="yolov8n">yolov8n</option>
              <option value="yolov8s">yolov8s</option>
            </Select>
            <SubLabel>yolo 모델을 지정합니다.</SubLabel>
          </Field>

          <Field>
            <LabelRow>
              <Label>이미지 크기 선택</Label>
              <RangeText>
                {SIZE_OPTIONS[0]}–{SIZE_OPTIONS[SIZE_OPTIONS.length - 1]}
              </RangeText>
            </LabelRow>
            <RangeWrap>
              <RangeInput
                type="range"
                min={0}
                max={SIZE_OPTIONS.length - 1}
                step={1}
                value={sizeIndex}
                onChange={(e) => setSizeIndex(Number(e.target.value))}
              />
            </RangeWrap>
            <CurrentSize>선택된 크기: {imageSize}px</CurrentSize>
            <SubLabel>학습 이미지 크기를 지정합니다.</SubLabel>
          </Field>

          <Field>
            <Label>학습 반복 횟수</Label>
            <Input
              type="number"
              value={epoch}
              onChange={(e) => setEpoch(e.target.value)}
            />
            <SubLabel>epoch 수를 지정합니다.</SubLabel>
          </Field>

          {/* 2행: 배치 사이즈, 모델 명, 빈 칸 */}
          <Field>
            <Label>배치 사이즈</Label>
            <Select
              value={batchSize}
              onChange={(e) => setBatchSize(e.target.value)}
            >
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="32">32</option>
            </Select>
            <SubLabel>batch 사이즈를 지정합니다.</SubLabel>
          </Field>

          <Field>
            <Label>모델 명</Label>
            <Input
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
            />
            <SubLabel>모델 명을 지정합니다.</SubLabel>
          </Field>

          {/* 빈 칸을 위한 빈 Field */}
          <Field />
          
        </FieldGrid>
        <ButtonWrap>
          <TrainButton onClick={handleTraining}>모델 학습</TrainButton>
        </ButtonWrap>
        {isTraining && (
          <Modal>
            <ModalBox>
              <h2>모델 학습 중...</h2>
              <p>
                잠시만 기다려 주세요! 모델이 학습되는데 오래 시간이 걸립니다.
              </p>
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
      </FormBox>
    </Container>
  );
};

export default AILearning;

// ---------- Styled Components ----------
const Container = styled.div`
  padding: 20px;
`;

const FormBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center; /* 버튼 가운데 정렬 */
  background: white;
  padding: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
`;

const FieldGrid = styled.div`
margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px 24px;
  width: 100%; /* 필드 그리드가 꽉 차도록 */
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 6px;
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const RangeText = styled.span`
  font-size: 14px;
  color: #757575;
`;

const RangeWrap = styled.div`
  width: 100%;
  margin-bottom: 8px;
`;

const RangeInput = styled.input`
  width: 100%;
  -webkit-appearance: none;
  height: 8px;
  background: #ddd;
  border-radius: 4px;
  outline: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #6b4eff;
    cursor: pointer;
    margin-top: -4px;
  }
  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #6b4eff;
    cursor: pointer;
  }
`;

const CurrentSize = styled.p`
  font-size: 14px;
  margin: 8px 0;
  color: #344053;
`;

const Input = styled.input`
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #cfd4dc;
  border-radius: 8px;
  background: #fff;
  margin-bottom: 8px;
   display: flex;
`;

const Select = styled.select`
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #cfd4dc;
  border-radius: 8px;
  background: #fff;
  margin-bottom: 8px;
`;

const SubLabel = styled.span`
  font-size: 12px;
  color: #757575;
`;

const ButtonWrap = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
`;

const TrainButton = styled.button`
  background: #6b4eff;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  padding: 16px 48px;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  &:hover {
    background: #5b40df;
  }
`;
const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  z-index: 10; /* 적당한 z-index */
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
