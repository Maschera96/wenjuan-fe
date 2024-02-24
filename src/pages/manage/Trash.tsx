import React, { FC, useState } from "react";
import { Typography, Empty, Table, Tag, Button, Space, Modal } from "antd";
import { useTitle } from "ahooks";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "./common.module.scss";
import config from "../../config/config";

const { Title } = Typography;
const { confirm } = Modal;

const rawQuestionList = [
  {
    _id: "q1",
    title: "问卷1",
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: "3月12日 13:23",
  },
  {
    _id: "q2",
    title: "问卷2",
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: "3月15日 14:23",
  },
  {
    _id: "q3",
    title: "问卷3",
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: "4月10日 13:26",
  },
  {
    _id: "q4",
    title: "问卷4",
    isPublished: true,
    isStar: false,
    answerCount: 5,
    createdAt: "4月14日 18:53",
  },
];

const Trash: FC = () => {
  useTitle(`${config.projectName} - 回收站`);

  const [questionList, setQuestionList] = useState(rawQuestionList);

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
        dataSource={questionList}
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
        <div className={styles.right}>（搜索）</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据"></Empty>}
        {questionList.length > 0 && TableElem}
      </div>
    </>
  );
};

export default Trash;
