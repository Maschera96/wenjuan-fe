import React, { FC } from "react";
import { useNavigate, Link } from "react-router-dom";

const Home: FC = () => {
  const nav = useNavigate();
  function clickHandler() {
    nav("/login");
  }
  return (
    <>
      <p>Home</p>;
      <div>
        <button onClick={clickHandler}>登录</button>
        <Link to="/register">注册</Link>
      </div>
    </>
  );
};

export default Home;
