import React, { FC } from "react";
import { Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";
import { PROJECT_NAME } from "../constant";

const { Title } = Typography;

const Logo: FC = () => {
  return (
    <div className={styles.container}>
      <Link to="/">
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>{PROJECT_NAME}</Title>
        </Space>
      </Link>
    </div>
  );
};

export default Logo;
