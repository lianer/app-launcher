import { Box, IconButton, Input } from '@mui/material';
import classnames from 'classnames';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import s from './Search.module.css';
import { filter } from '../../state/Filter';
import { observer } from 'mobx-react';

export const Search: React.FC = observer(function () {
  const [open, toggleOpen] = useState(false);

  const handleClick = () => {
    toggleOpen(!open);
  };

  const handleBlur = () => {
    toggleOpen(false);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    filter.setKeywords(event.target.value);
  };

  console.log(open);

  return (
    <Box className={s.Search}>
      <IconButton
        className={classnames(s.Button, open && s.Active)}
        onClick={() => handleClick()}
      >
        <SearchIcon fontSize="small" />
      </IconButton>
      <Input
        placeholder="Search..."
        className={classnames(
          s.Input,
          (open || filter.keywords.trim() !== '') && s.Active
        )}
        onBlur={handleBlur}
        onChange={handleInput}
      />
    </Box>
  );
});
