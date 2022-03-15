import { Box, IconButton, Input } from '@mui/material';
import classnames from 'classnames';
import { useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import s from './Search.module.css';
import { filter } from '../../state/Filter';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

export const Search: React.FC = observer(function () {
  // 输入框显隐状态
  // const [open, toggleOpen] = useState(false);

  // 控制焦点状态
  const [active, toggleActive] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // 当输入框显示的时候自动获得焦点
  // useEffect(() => {
  //   if (open) {
  //     inputRef.current?.querySelector('input')!.focus();
  //   }
  // }, [open]);

  // 点击使输入框获得焦点
  const focus = () => {
    toggleActive(true);
    inputRef.current?.querySelector('input')!.focus();
  };

  // 当输入框失去焦点，并且没有搜索内容的时候，隐藏输入框
  const blur = () => {
    toggleActive(false);
  };

  // 当输入框内容发生变化的时候，更新搜索内容
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    filter.setKeywords(event.target.value);
  };

  return (
    <Box className={classnames(s.Search, active && s.Active)} onClick={focus}>
      <IconButton className={s.Button}>
        <SearchIcon fontSize="small" />
      </IconButton>
      <Input
        ref={inputRef}
        placeholder="Search..."
        disableUnderline={true}
        className={s.Input}
        onBlur={blur}
        onChange={handleInput}
      />
    </Box>
  );
});
