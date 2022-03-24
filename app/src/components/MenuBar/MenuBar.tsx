import { Box } from '@mui/material';
import { Groups } from '../Groups';
import { More } from '../More';
import s from './MenuBar.module.css';
import { Search } from '../Search';

// TODO [ ] 调整可拖拽窗口的范围

const DragableBar: React.FC = function () {
  return <div className={s.DragableBar}></div>;
};

export const MenuBar: React.FC = function () {
  return (
    <Box className={s.MenuBar}>
      <DragableBar />
      <Search />
      <Groups />
      <More />
    </Box>
  );
};
