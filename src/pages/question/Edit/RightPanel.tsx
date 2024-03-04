import React, { FC } from "react";
import { Tabs } from "antd";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import ComponentProp from "./ComponentProp";

const RightPanel: FC = () => {
  const tabItems = [
    {
      key: "prop",
      label: <span>属性</span>,
      children: <ComponentProp />,
      icon: <FileTextOutlined />,
    },
    {
      key: "setting",
      label: <span>页面设置</span>,
      children: <div>页面设置</div>,
      icon: <SettingOutlined />,
    },
  ];

  return <Tabs defaultActiveKey="prop" items={tabItems}></Tabs>;
};

export default RightPanel;
