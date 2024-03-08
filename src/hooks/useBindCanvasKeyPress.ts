import { useKeyPress } from "ahooks";
import { useDispatch } from "react-redux";
import { ActionCreators as UndoActionCreators } from "redux-undo";
import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextComponent,
  selectPrevComponent,
} from "../store/componentsReducer";

// 判断 activeElem 是否合法
function isActiveElementValid() {
  const activeElem = document.activeElement;

  if (activeElem === document.body) return true; // 光标没有 focus 到 input 上
  if (activeElem?.matches('div[role="button"]')) return true; // 加入 dnd-kit 后的兼容

  return false;
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch();

  // 删除
  useKeyPress(["backspace", "delete"], () => {
    // 如果光标 focus 非法
    if (!isActiveElementValid()) return;

    dispatch(removeSelectedComponent());
  });

  // 复制
  useKeyPress(["ctrl.c", "meta.c"], () => {
    if (!isActiveElementValid()) return;
    dispatch(copySelectedComponent());
  });

  // 粘贴
  useKeyPress(["ctrl.v", "meta.v"], () => {
    if (!isActiveElementValid()) return;
    dispatch(pasteCopiedComponent());
  });

  // 选中上一个
  useKeyPress(["uparrow"], () => {
    if (!isActiveElementValid()) return;
    dispatch(selectPrevComponent());
  });

  // 选中下一个
  useKeyPress(["downarrow"], () => {
    if (!isActiveElementValid()) return;
    dispatch(selectNextComponent());
  });

  // 撤销
  useKeyPress(
    ["ctrl.z", "meta.z"],
    (event: KeyboardEvent) => {
      if (!isActiveElementValid()) return;
      event.preventDefault();
      dispatch(UndoActionCreators.undo());
    },
    { exactMatch: true },
  );

  // 重做
  useKeyPress(["ctrl.y", "meta.y"], (event: KeyboardEvent) => {
    if (!isActiveElementValid()) return;
    event.preventDefault;
    dispatch(UndoActionCreators.redo());
  });
}

export default useBindCanvasKeyPress;
