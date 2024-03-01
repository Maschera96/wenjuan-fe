import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { MANAGE_INDEX_PATHNAME } from "../router";
import styles from "./Home.module.scss";

const { Title, Paragraph } = Typography;

const Home: FC = () => {
  const nav = useNavigate();

  const [dataA, setDataA] = useState(0);
  const [dataB, setDataB] = useState(0);
  const flag = dataA > dataB;

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>
          已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份
        </Paragraph>
        <div>
          <Button
            type="primary"
            onClick={() => {
              nav(MANAGE_INDEX_PATHNAME);
            }}
          >
            开始使用
          </Button>
        </div>
        <div>
          <p>flag {JSON.stringify(flag)}</p>
          <div>
            <span>dataA: {dataA}</span>
            <button onClick={() => setDataA(dataA + 1)}>+</button>
          </div>
          <div>
            <span>dataB: {dataB}</span>
            <button onClick={() => setDataB(dataB + 1)}>+</button>
          </div>
          <button onClick={() => console.log("flag", flag, typeof flag)}>
            console flag
          </button>
          <button onClick={() => console.log("dataA", dataA, typeof dataA)}>
            console dataA
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
