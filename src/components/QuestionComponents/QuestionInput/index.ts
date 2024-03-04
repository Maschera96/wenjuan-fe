import { QuestionInputDefaultProps } from "./interface";
import Component from "./Component";
import PropComponent from "./PropComponent";

export * from "./interface";

export default {
  title: "输入框",
  type: "questionInput",
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionInputDefaultProps,
};
