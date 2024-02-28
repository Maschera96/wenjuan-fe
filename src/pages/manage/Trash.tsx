import React, { FC, useState } from "react";
import {
  Typography,
  Empty,
  Table,
  Tag,
  Button,
  Space,
  Modal,
  Spin,
} from "antd";
import { useTitle } from "ahooks";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "./common.module.scss";
import { PROJECT_NAME } from "../../constant";
import ListSearch from "../../components/ListSearch";
import useLoadQuestionListData from "../../hooks/useLoadQuestionList";

const { Title } = Typography;
const { confirm } = Modal;

const Trash: FC = () => {
  useTitle(`${PROJECT_NAME} - 回收站`);

  const { data = {}, loading } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;

  // 记录选中的 id
  const [selectIds, setSelectIds] = useState<string[]>([]);

  function del() {
    confirm({
      title: "确认彻底删除以下问卷？",
      icon: <ExclamationCircleOutlined />,
      content: "删除后不可以找回",
      onOk: () => alert(`删除 ${JSON.stringify(selectIds)}`),
    });
  }

  const tableColumns = [
    { title: "标题", dataIndex: "title" },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="processing">已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        );
      },
    },
    { title: "答卷", dataIndex: "answerCount" },
    { title: "创建时间", dataIndex: "createdAt" },
  ];

  const TableElem = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button type="primary" disabled={selectIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
        columns={tableColumns}
        pagination={false}
        rowKey={(q) => q._id}
        rowSelection={{
          type: "checkbox",
          onChange: (selectRowKeys) => {
            setSelectIds(selectRowKeys as string[]);
          },
        }}
      />
    </>
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
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
        {list.length > 0 && TableElem}
      </div>
    </>
  );
};

export default Trash;
