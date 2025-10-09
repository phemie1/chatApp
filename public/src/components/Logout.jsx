import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
       // confirm with the user before logging out
      let displayName = "User";
      try {
        const userRaw = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
        if (userRaw) {
          const parsed = JSON.parse(userRaw);
          displayName = parsed.username || parsed.name || parsed.email || "User";
        }
      } catch (e) {
      // ignore parse errors and fall back to generic displayName
    }
    // confirm with the user before logging out
    const confirmed = window.confirm(`${displayName}, are you sure you want to log out?`);
    if (!confirmed) return;

    try {
      const raw = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      if (!raw) {
        // nothing in storage — still navigate to login
        localStorage.clear();
        navigate("/login");
        return;
      }
      const { _id } = JSON.parse(raw);
      // attempt server logout but proceed regardless of result
      await axios.get(`${logoutRoute}/${_id}`);
    } catch (err) {
      // ignore errors (network / parse) and still clear storage
    } finally {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <Button onClick={handleClick} aria-label="Logout">
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
