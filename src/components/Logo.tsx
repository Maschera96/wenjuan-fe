import React, { FC } from "react";
import { Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";
import config from "../config/config";

const { Title } = Typography;
console.log("config", config);

const Logo: FC = () => {
  return (
    <div className={styles.container}>
      <Link to="/">
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>{config.projectName}</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
