import { FC } from "react";
import QuestionInputConf, { QuestionInputPropsType } from "./QuestionInput";
import QuestionTitleConf, { QuestionTitlePropsType } from "./QuestionTitle";

// 统一， 各个组件的类型
export type ComponentPropsType = QuestionInputPropsType &
  QuestionTitlePropsType;

// 统一，组件的配置
export type ComponentConfType = {
  title: string;
  type: string;
  Component: FC<ComponentPropsType>;
  PropComponent: FC<ComponentPropsType>;
  defaultProps: ComponentPropsType;
};

// 全部的组件配置的列表
const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
];

// 组件分组
export const componentConfGroup = [
  {
    groupId: "textGroup",
    groupName: "文本显示",
    components: [QuestionTitleConf],
  },
  {
    groupId: "inputGroup",
    groupName: "用户输入",
    components: [QuestionInputConf],
  },
];

export function getComponentConfByType(type: string) {
  return componentConfList.find((c) => c.type === type);
}
