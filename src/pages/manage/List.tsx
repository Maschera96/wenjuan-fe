import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { Typography, Spin, Empty } from "antd";
import { useDebounceFn, useRequest, useSetState, useTitle } from "ahooks";
import styles from "./common.module.scss";
import QuestionCard from "../../components/QuestionCard";
import {
  LIST_SEARCH_PARAM_KEY,
  LIST_PAGE_SIZE,
  PROJECT_NAME,
} from "../../constant";
import ListSearch from "../../components/ListSearch";
import { getQuestionListService } from "../../services/question";
import { useSearchParams } from "react-router-dom";

const { Title } = Typography;

const List: FC = () => {
  useTitle(`${PROJECT_NAME} - 我的问卷`);

  const [started, setStarted] = useState(false);
  const [page, setPage] = useState(1);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const haveMoreData = total > list.length;

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

  // keyword 变化时，重置信息
  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);

  // 加载数据
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      });
      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result;
        setList(list.concat(l));
        setTotal(total);
        setPage(page + 1);
      },
    },
  );

  // 触发加载 - 防抖
  const containerRef = useRef<HTMLDivElement>(null);
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem === null) return;

      const domRect = elem.getBoundingClientRect();
      if (domRect === null) return;
      const { bottom } = domRect;
      if (bottom <= document.body.clientHeight) {
        load();
        setStarted(true);
      }
    },
    {
      wait: 1000,
    },
  );

  // 1. url 参数变化时（keyword），触发加载
  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);

  // 2. 上滑加载更多
  useEffect(() => {
    if (haveMoreData) {
      window.addEventListener("scroll", tryLoadMore);
    }

    return () => {
      window.removeEventListener("scroll", tryLoadMore); // 解绑
    };
  }, [searchParams, haveMoreData]);

  // const { data = {}, loading } = useLoadQuestionListData();
  // const { list = [], total = 0 } = data;

  const LoadMoreContentElem = useMemo(() => {
    if (!started || loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (!haveMoreData) return <span>没有更多了...</span>;
    return <span>开始加载下一页</span>;
  }, [started, loading, haveMoreData]);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;

            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem}</div>
      </div>
    </>
  );
};

export default List;
