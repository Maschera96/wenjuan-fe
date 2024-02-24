import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const nav = useNavigate();
  function clickHandler() {
    nav(-1);
  }

  return (
    <>
      <p>Login</p>;
      <div>
        <button onClick={clickHandler}>返回</button>
      </div>
    </>
  );
};

export default Login;
