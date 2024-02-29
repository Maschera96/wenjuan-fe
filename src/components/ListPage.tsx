import { Pagination } from "antd";
import React, { FC, useEffect, useState } from "react";
import {
  LIST_PAGE_SIZE,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY,
} from "../constant";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

type PropsType = {
  total: number;
};

const ListPage: FC<PropsType> = (props: PropsType) => {
  const { total } = props;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);

  //   将 url 参数中的 page pageSize 同步到 Pagination 中
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") ||
      LIST_PAGE_SIZE;

    setCurrent(page);
    setPageSize(pageSize);
  }, [searchParams]);

  //   page pageSize 改变时，跳转页面（改变 url 参数）
  const nav = useNavigate();
  const { pathname } = useLocation();
  function handlerPageChange(page: number, pageSize: number) {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    nav({
      pathname,
      search: searchParams.toString(),
    });
  }

  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={handlerPageChange}
    ></Pagination>
  );
};

export default ListPage;
