import React, { FC, useEffect, useState } from "react";
import { Space, Typography } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";
import { PROJECT_NAME } from "../constant";
import useGetUserInfo from "../hooks/useGetUserInfo";
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from "../router";

const { Title } = Typography;

const Logo: FC = () => {
  const { username } = useGetUserInfo();

  const [pathname, setPathname] = useState(HOME_PATHNAME);
  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME);
    }
  }, [pathname]);

  return (
    <div className={styles.container}>
      <Link to={pathname}>
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
