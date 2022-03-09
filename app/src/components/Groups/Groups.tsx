import { observer } from 'mobx-react';
import { settings } from '../../state/Settings';
import s from './Groups.module.css';
import classnames from 'classnames';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { IconButton } from '@mui/material';

const AddGroupBtton: React.FC = function () {
  const [open, toggleOpen] = useState(false);
  const handleClick = () => {
    toggleOpen(!open);
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

  return (
    <div className={s.Groups}>
      {groups.map((group) => (
        <div
          className={classnames(s.Group, {
            [s.Active]: group.id === activatedGroupId,
          })}
          key={group.id}
          onClick={() => settings.activeGroup(group.id)}
        >
          {group.name}
        </div>
      ))}
      <AddGroupBtton />
    </div>
  );
});
