import React, { FC } from "react";
import { Typography, Empty, Spin, Pagination } from "antd";
import { useTitle } from "ahooks";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import { PROJECT_NAME } from "../../constant";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";
import ListPage from "../../components/ListPage";

const { Title } = Typography;

const Star: FC = () => {
  useTitle(`${PROJECT_NAME} - 我的问卷`);

  const { data = {}, loading } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin></Spin>
          </div>
        )}
        {!loading && list.length === 0 && (
          <Empty description="暂无数据"></Empty>
        )}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;

            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total}></ListPage>
      </div>
    </>
  );
};

export default Star;
