import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import icon from "../assets/icon.png";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "사용자 관리", path: "/users" },
    { label: "디바이스 모니터링", path: "/monitoring" },
    { label: "AI 관리", path: "/ai" },
    { label: "알림 관리", path: "/alerts" },
    { label: "업데이트 관리", path: "/updates" },
  ];

  const handleLogout = () => {
    alert("로그아웃되었습니다.");
    navigate("/");
  };

  return (
    <Container>
      <Logo onClick={() => navigate("/")}>
        <img src={icon} alt="logo" />
      </Logo>

      <Menu>
        {menu.map((item) => (
          <MenuItem
            key={item.label}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>

      <LogoutButton onClick={handleLogout}>logout</LogoutButton>
    </Container>
  );
};

export default Navbar;


//style-components--------------------------------------------
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 36px;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  img {
    height: 40px;
    cursor: pointer;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 40px;
`;

const MenuItem = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => (props.active ? "#6B4EFF" : "#0F172A")};
  cursor: pointer;
  border-bottom: ${(props) => (props.active ? "2px solid #6B4EFF" : "none")};
  padding-bottom: 4px;

  &:hover {
    color: #6b4eff;
  }
`;

const LogoutButton = styled.button`
  background-color: #6b4eff;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #5c40e5;
  }
`;
