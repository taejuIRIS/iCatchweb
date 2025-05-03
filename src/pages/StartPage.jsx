// src/pages/StartPage.jsx
import React, { useState } from "react";
import * as S from "../styles/StartPageSC";
import icon from "../assets/icon.png";
import page from "../assets/page.png";
import LoginModal from "../components/LoginModal"; // 모달 컴포넌트 import

const StartPage = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <S.Container>
        <S.TopBar>
          <S.LeftText>
            <span className="black">i</span>
            <span className="purple">Catch</span>
          </S.LeftText>

          <S.CenterLogo src={icon} alt="logo" />

          <S.LoginButton onClick={openModal}>
            <S.LoginText>login</S.LoginText>
          </S.LoginButton>
        </S.TopBar>

        <S.MainSection>
          <S.LeftBlock>
            <S.Title>
              <span className="black">i</span>
              <span className="purple">Catch</span> ADMIN Web
            </S.Title>
            <S.Description>
              iCatch는 제스처로 제어하는 AI 홈 CCTV로 앱 뿐만 아니라 제스처로
              편리하게 카메라를 관리할 수 있습니다.
            </S.Description>
            <S.ActionButton onClick={openModal}>
              <S.ActionText>로그인하고 관리하기</S.ActionText>
              <S.ActionIcon
                src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/LOuxGbbzNT/ccv2bzh0_expires_30_days.png"
                alt="→"
              />
            </S.ActionButton>
          </S.LeftBlock>

          <S.PageImage src={page} alt="page" />
        </S.MainSection>
      </S.Container>

      {showModal && <LoginModal onClose={closeModal} />}
    </>
  );
};

export default StartPage;
