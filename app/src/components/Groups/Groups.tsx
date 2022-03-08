import { observer } from 'mobx-react';
import { settings } from '../../state/Settings';
import { Icon } from '../Icon';
import s from './Groups.module.css';
import classnames from 'classnames';

const AddGroupBtton: React.FC = function () {
  return (
    <div className={s.AddGroupButton}>
      <Icon name="icon-add"></Icon>
    </div>
  );
};

export const Groups: React.FC = observer(function () {
  const { activatedGroup, groups } = settings;
  const id = activatedGroup?.id;

  return (
    <div className={s.Groups}>
      {groups.map((group) => (
        <div
          className={classnames(s.Group, {
            [s.Active]: group.id === id,
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
