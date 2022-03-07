import { Icon } from '../Icon';
import { More } from '../More';
import s from './MenuBar.module.css';

const Space: React.FC = function () {
  return <div className={s.Space}></div>;
};

const Search: React.FC = function () {
  return (
    <div className={s.Search}>
      <Icon name="icon-search"></Icon>
    </div>
  );
};

const Groups: React.FC = function () {
  return (
    <div className={s.Groups}>
      <div className={s.Group}>收藏</div>
      <div className={s.Group}>应用程序</div>
      <div className={s.Group}>文件</div>
      <div className={s.Group}>Movies</div>
    </div>
  );
};

const AddGroupBtton: React.FC = function () {
  return (
    <div className={s.AddGroupButton}>
      <Icon name="icon-add"></Icon>
    </div>
  );
};

export const MenuBar: React.FC = function () {
  return (
    <div className={s.MenuBar}>
      <Space />
      <Search />
      <Groups />
      <AddGroupBtton />
      <Space />
      <More />
    </div>
  );
};
