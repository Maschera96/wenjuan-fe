import React, { FC } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import {
  ComponentPropsType,
  getComponentConfByType,
} from "../../../components/QuestionComponents";
import { useDispatch } from "react-redux";
import { changeComponentProps } from "../../../store/componentsReducer";

const NoProp: FC = () => {
  return <div style={{ textAlign: "center" }}>未选中组件</div>;
};

const ComponentProp: FC = () => {
  const dispatch = useDispatch();

  const { selectedComponent } = useGetComponentInfo();
  if (selectedComponent == null) return <NoProp />;

  const { type, props } = selectedComponent;
  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return <NoProp />;

  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return;
    const { fe_id } = selectedComponent;

    dispatch(changeComponentProps({ fe_id, newProps }));

    console.log("newProps", newProps);
  }

  const { PropComponent } = componentConf;
  return <PropComponent {...props} onChange={changeProps} />;
};

export default ComponentProp;
