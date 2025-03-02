import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth";
import styled from "styled-components";

const NavbarContainer = styled.nav`
  background: #2c3e50;
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  &:hover {
    color: #f39c12;
  }
`;

const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
`;

const NavItem = styled.li`
  display: inline;
  align-self: center;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  transition: 0.3s;
  &:hover {
    color: #f39c12;
  }
`;

const LogoutButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  transition: 0.3s;
  &:hover {
    background: #c0392b;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { token, role, logout } = React.useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <NavbarContainer>
      <Logo to="/">Ticket System</Logo>
      <NavLinks>
        {token ? (
          <>
            {role === "admin" && (
              <NavItem>
                <StyledLink to="/admin">Admin Dashboard</StyledLink>
              </NavItem>
            )}
            <NavItem>
              <StyledLink to="/dashboard">Dashboard</StyledLink>
            </NavItem>
            <NavItem>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem>
              <StyledLink to="/login">Login</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/signup">Signup</StyledLink>
            </NavItem>
          </>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
