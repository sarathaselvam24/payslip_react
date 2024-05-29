import React from "react";
import { useNavigate } from "react-router-dom";
const UserNotFound = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate(`/`);
  };

  return (
    <div>
      <h1>Employee Not Found</h1>

      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default UserNotFound;
