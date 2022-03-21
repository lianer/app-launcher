import { observer } from 'mobx-react';
import { settings } from '../../state/Settings';
import s from './Groups.module.css';
import classnames from 'classnames';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { Group } from '../../interface';
import { useEffect, useRef, useState } from 'react';

const selectNodeText = function <T extends Node = HTMLElement>(node: T): void {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(node);
  selection?.removeAllRanges();
  selection?.addRange(range);
};

const AddGroupBtton: React.FC<{
  editGroup?: (addedGroup: Group) => void;
}> = function (props) {
  const handleClick = () => {
    const addedGroup = settings.addGroup('未命名');
    props.editGroup?.(addedGroup);
  };

  return (
    <div className={s.AddGroupButton}>
      <IconButton onClick={handleClick}>
        <AddIcon fontSize="small"></AddIcon>
      </IconButton>
    </div>
  );
};

export const Groups: React.FC = observer(function () {
  const { activatedGroupId, groups } = settings;
  const [editing, setEditing] = useState<null | Group>(null);
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
      selectNodeText(inputEl.current);
    }
  }, [editing?.id]);

  const editGroup = (group: Group) => {
    setEditing(group);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      rename(e.currentTarget.innerText);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      rename(editing!.name);
    }
  };

  const onBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    rename(e.currentTarget.innerText);
  };

  const rename = (name: string) => {
    name = name.trim() || '未命名';
    settings.renameGroup(editing!.id, name);
    inputEl.current!.innerText = editing!.name;
    setEditing(null);
  };

  return (
    <div className={s.Groups}>
      {groups.map((group) => (
        <div
          className={classnames(s.Group, {
            [s.Active]: group.id === activatedGroupId,
          })}
          key={group.id}
          data-key={group.id}
          onClick={() => settings.activeGroup(group.id)}
          ref={editing?.id === group.id ? inputEl : null}
          suppressContentEditableWarning={true}
          contentEditable={editing?.id === group.id}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        >
          {group.name}
        </div>
      ))}

      <AddGroupBtton editGroup={(group) => editGroup(group)} />
    </div>
  );
});
