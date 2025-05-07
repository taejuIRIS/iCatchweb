import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Popup from "./Popup";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://ceprj.gachon.ac.kr:60004/api/admin/login",
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = response.data;
      const loginData = result?.data;

      if (response.status === 200 && result.success && loginData?.token) {
        // ✅ 토큰과 닉네임을 저장
        localStorage.setItem("adminToken", loginData.token);
        localStorage.setItem("adminNickname", loginData.userNickname);
        setPopupVisible(true); // 팝업 띄우기
      } else {
        alert("로그인 실패: 서버 응답이 예상과 다릅니다.");
      }
    } catch (error) {
      const message =
        error.response?.data?.data?.message || "서버 연결에 실패했습니다.";
      alert(`로그인 실패: ${message}`);
    }
  };

  const handlePopupOkay = () => {
    setPopupVisible(false);
    onClose(); // 모달 닫기
    navigate("/users"); // 👉 로그인 성공 후 /users 이동
  };

  return (
    <>
      <Wrapper>
        <LoginBox>
          <CloseButton onClick={onClose}>×</CloseButton>
          <LeftSide />
          <RightSide>
            <Title>LOGIN</Title>
            <Subtitle>로그인 후 편리하게 iCatch를 관리하세요!</Subtitle>

            <Label>Email</Label>
            <Input
              placeholder="admin@admin.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Label>Password</Label>
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <LoginButton onClick={handleLogin}>
              <LoginText>로그인</LoginText>
            </LoginButton>
          </RightSide>
        </LoginBox>
      </Wrapper>

      {popupVisible && (
        <Popup
          title="로그인 성공"
          message="로그인에 성공하였습니다!"
          onClose={handlePopupOkay}
        />
      )}
    </>
  );
};

export default LoginModal;

// ---------- Styled Components ----------
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
`;

const LoginBox = styled.div`
  display: flex;
  position: relative;
  background: #fff;
  border-radius: 30px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  width: 900px;
  max-width: 95%;
`;

const LeftSide = styled.div`
  width: 280px;
  background: #c6c4ff;
  flex-shrink: 0;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 50px;
  flex: 1;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: #0f172a;
  margin-bottom: 24px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #475569;
  margin-bottom: 48px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #344053;
  margin-bottom: 6px;
`;

const Input = styled.input`
  background: #fff;
  border: 1px solid #cfd4dc;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  margin-bottom: 24px;
  color: #667084;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
`;

const LoginButton = styled.button`
  background-color: #6a4dff;
  color: #fff;
  font-weight: bold;
  padding: 16px;
  border: none;
  border-radius: 48px;
  font-size: 16px;
  cursor: pointer;
`;

const LoginText = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  font-size: 28px;
  color: #888;
  border: none;
  cursor: pointer;
  z-index: 10;
  &:hover {
    color: #333;
  }
`;

