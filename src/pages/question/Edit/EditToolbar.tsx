import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
  changeComponentHidden,
  copySelectedComponent,
  moveComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLocked,
} from "../../../store/componentsReducer";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

const EditToolbar: FC = () => {
  const dispatch = useDispatch();
  const { selectedId, componentList, selectedComponent, copiedComponent } =
    useGetComponentInfo();
  const { isLocked } = selectedComponent || {};
  const length = componentList.length;
  const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId);
  const isFirst = selectedIndex <= 0;
  const isLast = selectedIndex + 1 >= length;

  //   删除组件
  function handleDelete() {
    dispatch(removeSelectedComponent());
  }

  //   隐藏组件
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
  }

  //   锁定组件
  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }));
  }

  //   复制
  function copy() {
    dispatch(copySelectedComponent());
  }

  //   粘贴
  function paste() {
    dispatch(pasteCopiedComponent());
  }

  // 上移
  function moveUp() {
    if (isFirst) return;
    dispatch(
      moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }),
    );
  }

  // 下移
  function moveDown() {
    if (isLast) return;
    dispatch(
      moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }),
    );
  }

  return (
    <>
      <Space>
        <Tooltip title="删除">
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={handleDelete}
          ></Button>
        </Tooltip>

        <Tooltip title="隐藏">
          <Button
            shape="circle"
            icon={<EyeInvisibleOutlined />}
            onClick={handleHidden}
          ></Button>
        </Tooltip>

        <Tooltip title="锁定">
          <Button
            shape="circle"
            icon={<LockOutlined />}
            onClick={handleLock}
            type={isLocked ? "primary" : "default"}
          ></Button>
        </Tooltip>

        <Tooltip title="复制">
          <Button
            shape="circle"
            icon={<CopyOutlined />}
            onClick={copy}
          ></Button>
        </Tooltip>

        <Tooltip title="粘贴">
          <Button
            shape="circle"
            icon={<BlockOutlined />}
            onClick={paste}
            disabled={copiedComponent == null}
          ></Button>
        </Tooltip>

        <Tooltip title="上移">
          <Button
            shape="circle"
            icon={<UpOutlined />}
            onClick={moveUp}
            disabled={isFirst}
          ></Button>
        </Tooltip>

        <Tooltip title="下移">
          <Button
            shape="circle"
            icon={<DownOutlined />}
            onClick={moveDown}
            disabled={isLast}
          ></Button>
        </Tooltip>
      </Space>
    </>
  );
};

export default EditToolbar;
