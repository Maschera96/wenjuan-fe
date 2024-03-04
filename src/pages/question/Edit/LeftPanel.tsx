import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import React, { FC } from "react";
import ComponentLib from "./ComponentLib";

const LeftPanel: FC = () => {
  const tabItems = [
    {
      key: "componentLib",
      label: <span>组件库</span>,
      children: <ComponentLib />,
      icon: <AppstoreOutlined />,
    },
    {
      key: "layers",
      label: <span>图层</span>,
      children: <div>图层</div>,
      icon: <BarsOutlined />,
    },
  ];
  return <Tabs defaultActiveKey="componentLib" items={tabItems}></Tabs>;
};

export default LeftPanel;
