import React, { FC, useMemo, useRef } from "react";
import styles from "./StatHeader.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Input,
  InputRef,
  Popover,
  Space,
  Tooltip,
  Typography,
  message,
} from "antd";
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from "@ant-design/icons";
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import QRCode from "qrcode.react";

const { Title } = Typography;

const StatHeader: FC = () => {
  const nav = useNavigate();
  const { id } = useParams();

  const { title, isPublished } = useGetPageInfo();

  const urlInputRef = useRef<InputRef>(null);
  function copy() {
    // 拷贝
    const elem = urlInputRef.current;
    if (elem == null) return;
    elem.select(); // 选中 input
    document.execCommand("copy"); // 拷贝选中的内容
    message.success("拷贝成功");
  }

  // 使用 useMemo
  const LinkAndQRCodeElem = useMemo(() => {
    if (!isPublished) return null;

    const url = `http://localhost:3000/question/${id}`; // 拼接 url，需要符合 C端 的规则

    // 二维码组件
    const QRCodeElem = (
      <div style={{ textAlign: "center" }}>
        <QRCode value={url} size={150} />
      </div>
    );

    return (
      <Space>
        <Input ref={urlInputRef} value={url} style={{ width: "300px" }} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    );
  }, [id, isPublished]);

  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => nav(-1)}
            ></Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{LinkAndQRCodeElem}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatHeader;
