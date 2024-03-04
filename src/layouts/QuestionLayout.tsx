import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";
import { Spin } from "antd";

const QuestionLayout: FC = () => {
  // 加载用户信息
  const { waitingUserData } = useLoadUserData();
  // 根据用户是否登录，进行跳转
  useNavPage(waitingUserData);

  return (
    <div style={{ height: "100vh" }}>
      {waitingUserData ? (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <Spin />
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default QuestionLayout;
