import { useEffect, useState } from "react";
import useGetUserInfo from "./useGetUserInfo";
import { useRequest } from "ahooks";
import { getUserInfoService } from "../services/user";
import { useDispatch } from "react-redux";
import { loginReducer } from "../store/userReducer";

function useLoadUserData() {
  const dispatch = useDispatch();
  const [waitingUserData, setWaitingUserData] = useState(true);

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result;
      dispatch(loginReducer({ username, nickname })); // 存储到 redux store
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });

  const { username } = useGetUserInfo(); // redux store
  useEffect(() => {
    if (username) {
      setWaitingUserData(false);
      return;
    }
    run();
  }, [username]);

  // 只需要返回状态，不需要返回 data
  return { waitingUserData };
}

export default useLoadUserData;
