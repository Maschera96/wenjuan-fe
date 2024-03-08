import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserStateType } from "./userReducer";
import componentsReducer, { ComponentsStateType } from "./componentsReducer";
import pageInfoReducer, { PageInfoType } from "./pageInfoReducer";
import undoable, { StateWithHistory, excludeAction } from "redux-undo";

export type StateType = {
  user: UserStateType;
  components: StateWithHistory<ComponentsStateType>;
  pageInfo: PageInfoType;
};

export default configureStore({
  reducer: {
    // 用户信息
    user: userReducer,

    // 组件列表(增加了 undo)
    components: undoable(componentsReducer, {
      limit: 20, // 限制 20 步

      // 排除
      filter: excludeAction([
        "components/resetComponents",
        "components/changeSelectedId",
        "components/selectPrevComponent",
        "components/selectNextComponent",
      ]),
    }),

    // 问卷信息 title desc ...
    pageInfo: pageInfoReducer,
  },
});
