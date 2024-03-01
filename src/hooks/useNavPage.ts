import { useEffect } from "react";
import useGetUserInfo from "./useGetUserInfo";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
  isLoginOrRegister,
  isNoNeedUserInfo,
} from "../router";

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (waitingUserData) return;

    // 登录了
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME);
      }
      return;
    }

    // 未登录
    if (isNoNeedUserInfo(pathname)) {
      return;
    } else {
      nav(LOGIN_PATHNAME);
    }
  }, [waitingUserData, username, pathname]);
}

export default useNavPage;
