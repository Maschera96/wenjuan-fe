import { QuestionRadioDefaultProps } from "./interface";
import Component from "./Component";
import PropComponent from "./PropComponent";

export * from "./interface";

export default {
  title: "单选",
  type: "questionRadio",
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionRadioDefaultProps,
};
