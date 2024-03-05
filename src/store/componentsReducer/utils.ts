import { ComponentInfoType, ComponentsStateType } from ".";

export function getNextSelectedId(
  fe_id: string,
  componentList: ComponentInfoType[],
) {
  const visibleComponentList = componentList.filter((c) => !c.isHidden);
  const index = visibleComponentList.findIndex((c) => c.fe_id === fe_id);
  if (index < 0) return "";

  // 重新计算 selectedId
  let newSelectedId = "";
  const length = visibleComponentList.length;
  if (length <= 1) {
    newSelectedId = "";
  } else {
    if (index + 1 === length) {
      // 要删除最后一个，要选中上一个
      newSelectedId = visibleComponentList[index - 1].fe_id;
    } else {
      // 要删除的不是最后一个，要选中下一个
      newSelectedId = visibleComponentList[index + 1].fe_id;
    }
  }

  return newSelectedId;
}

export function insertNewComponent(
  draft: ComponentsStateType,
  newComponent: ComponentInfoType,
) {
  const { selectedId, componentList } = draft;
  const index = componentList.findIndex((c) => c.fe_id === selectedId);

  // 未选中任何组件
  if (index < 0) {
    draft.componentList.push(newComponent);
  } else {
    // 选中了组件，插入到 index 后面
    draft.componentList.splice(index + 1, 0, newComponent);
  }

  draft.selectedId = newComponent.fe_id;
}
