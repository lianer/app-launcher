import { observer } from 'mobx-react';
import { settings } from '../../state/Settings';
import s from './Groups.module.css';
import classnames from 'classnames';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Menu, MenuItem, Box } from '@mui/material';
import { Group } from '../../types/interface';
import { useEffect, useRef, useState } from 'react';

enum MenuType {
  'rename',
  'remove',
}

const defaultGroupName = '未命名';

/**
 * 选中指定 DOM 节点中的文本
 * @param node DOM 节点
 */
const selectNodeText = function <T extends Node = HTMLElement>(node: T): void {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(node);
  selection?.removeAllRanges();
  selection?.addRange(range);
};

/**
 * 添加分组
 */
const AddGroupBtton: React.FC<{
  onAddGroup?: (addedGroup: Group) => void;
}> = function (props) {
  const handleClick = () => {
    const addedGroup = settings.addGroup(defaultGroupName);
    props.onAddGroup?.(addedGroup);
  };

  return (
    <Box className={s.AddGroupButton}>
      <IconButton onClick={handleClick}>
        <AddIcon fontSize="small"></AddIcon>
      </IconButton>
    </Box>
  );
};

const MenuFC: React.FC<{
  open: boolean;
  anchorPosition: { left: number; top: number };
  onClose: (type?: MenuType) => void;
}> = function (props) {
  return (
    <Menu
      open={props.open}
      anchorReference="anchorPosition"
      anchorPosition={props.anchorPosition}
      onClose={() => props.onClose()}
    >
      <MenuItem onClick={() => props.onClose(MenuType.rename)}>重命名</MenuItem>
      <MenuItem onClick={() => props.onClose(MenuType.remove)}>删除</MenuItem>
    </Menu>
  );
};

export const Groups: React.FC = observer(function () {
  const { activatedGroupId, groups } = settings; // 当前激活的 group
  const [editing, setEditing] = useState<null | Group>(null); // 编辑中的 group
  const inputEl = useRef<HTMLInputElement>(null); // 编辑中的 group ref
  const [contextMenu, setContextMenu] = useState<{
    group: Group; // 右键作用的 group
    left: number; // 右键菜单坐标
    top: number; // 右键菜单坐标
  } | null>(null); // 右键菜单

  // 使正在编辑的 group 自动获取焦点
  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
      selectNodeText(inputEl.current);
    }
  }, [editing?.id]);

  // 激活指定的 group
  const activeGroup = (group: Group) => {
    settings.activeGroup(group.id);
  };

  // 新增 group，自动进入编辑状态
  const onAddGroup = (group: Group) => {
    setEditing(group);
    activeGroup(group);
  };

  // 编辑模式下，监听按键输入
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!editing) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      rename(e.currentTarget.innerText);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      rename(editing!.name);
    }
  };

  // 当编辑中的 group 失去焦点，应用新名称
  const onBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!editing) return;
    rename(e.currentTarget.innerText);
  };

  // 重新命名 group
  const rename = (name: string) => {
    name = name.trim() || defaultGroupName;
    settings.renameGroup(editing!.id, name);
    inputEl.current!.innerText = editing!.name; // 重新覆盖 innerText，避免 innerText 与 vNode 不同步
    setEditing(null);
  };

  // 监听右键事件，弹出菜单
  const onContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    group: Group
  ) => {
    event.preventDefault();
    const { clientX: left, clientY: top } = event;
    setContextMenu(contextMenu ? null : { group, left, top });
  };

  // 关闭菜单，并执行对应的命令
  const handleClose = (type?: MenuType) => {
    setContextMenu(null);
    switch (type) {
      case MenuType.rename:
        setEditing(contextMenu!.group);
        break;
      case MenuType.remove:
        settings.removeGroup(contextMenu!.group.id);
        break;
      default:
        console.log('Do nothing');
    }
  };

  return (
    <Box className={s.Groups}>
      {groups.map((group) => (
        <Box
          className={classnames({
            [s.Group]: true,
            [s.Active]: group.id === activatedGroupId,
          })}
          key={group.id}
          ref={editing?.id === group.id ? inputEl : null}
          suppressContentEditableWarning={true}
          contentEditable={editing?.id === group.id}
          onClick={() => activeGroup(group)}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          onContextMenu={(e) => onContextMenu(e, group)}
        >
          {group.name}
        </Box>
      ))}

      <AddGroupBtton onAddGroup={onAddGroup} />

      <MenuFC
        open={contextMenu !== null}
        anchorPosition={{
          left: contextMenu?.left ?? 0,
          top: contextMenu?.top ?? 0,
        }}
        onClose={handleClose}
      ></MenuFC>
    </Box>
  );
});
