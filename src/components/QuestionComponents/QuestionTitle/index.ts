import { QuestionTitleDefaultProps } from "./interface";
import Component from "./Component";
import PropComponent from "./PropComponent";

export * from "./interface";

export default {
  title: "输入框",
  type: "questionTitle",
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionTitleDefaultProps,
};
