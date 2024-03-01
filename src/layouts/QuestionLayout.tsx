import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import useLoadUserData from "../hooks/useLoadUserData";
import useNavPage from "../hooks/useNavPage";

const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);

  return (
    <>
      <div>QuestionLayout</div>
      <div>{!waitingUserData && <Outlet />}</div>
    </>
  );
};

export default QuestionLayout;
