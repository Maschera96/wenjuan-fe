import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Logo from "../components/Logo";
import UserInfo from "../components/UserInfo";
import styles from "./MainLayout.module.scss";
import { PROJECT_NAME } from "../constant";

const { Header, Content, Footer } = Layout;

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo></Logo>
        </div>
        <div className={styles.right}>
          <UserInfo></UserInfo>
        </div>
      </Header>
      <Content className={styles.main}>
        <Outlet></Outlet>
      </Content>
      <Footer className={styles.footer}>
        {PROJECT_NAME} &copy;2024 - present. Created by Maschera
      </Footer>
    </Layout>
  );
};

export default MainLayout;
