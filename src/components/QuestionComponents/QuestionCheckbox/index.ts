import { QuestionCheckboxDefaultProps } from "./interface";
import Component from "./Component";
import PropComponent from "./PropComponent";
import StatComponent from "./StatComponent";

export * from "./interface";

export default {
  title: "多选",
  type: "questionCheckbox",
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionCheckboxDefaultProps,
  StatComponent,
};
