import { Icon } from '../Icon';
import s from './Groups.module.css';

const AddGroupBtton: React.FC = function () {
  return (
    <div className={s.AddGroupButton}>
      <Icon name="icon-add"></Icon>
    </div>
  );
};

export const Groups: React.FC = function () {
  return (
    <div className={s.Groups}>
      <div className={s.Group}>收藏</div>
      <div className={s.Group}>应用程序</div>
      <div className={s.Group}>文件</div>
      <div className={s.Group}>Movies</div>
      <AddGroupBtton />
    </div>
  );
};
