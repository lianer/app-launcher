import { Groups } from '../Groups';
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

export const MenuBar: React.FC = function () {
  return (
    <div className={s.MenuBar}>
      <Space />
      <Search />
      <Groups />
      <Space />
      <More />
    </div>
  );
};
