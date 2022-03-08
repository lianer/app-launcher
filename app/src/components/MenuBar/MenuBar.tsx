import { Box, IconButton, Input } from '@mui/material';
import { Groups } from '../Groups';
import { More } from '../More';
import s from './MenuBar.module.css';
import { Search } from '../Search';

export const MenuBar: React.FC = function () {
  return (
    <Box className={s.MenuBar}>
      <Search />
      <Groups />
      <More />
    </Box>
  );
};
