import React from 'react';
import { IconButton, Menu, MenuItem, Box, Slider } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import s from './index.module.css';
import { observer } from 'mobx-react';
import { iconSize } from '../../mobx/IconSize';

const ITEM_HEIGHT = 80;

export const More: React.FC = observer(() => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={s.More}>
      {/* <Icon name="icon-more"></Icon> */}
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        <MenuItem>
          <Box width={200 - 32}>
            <Slider
              size="small"
              value={iconSize.size}
              aria-label="Small"
              valueLabelDisplay="auto"
              onChange={(ev, val) => {
                iconSize.setSize(val as number);
              }}
            />
          </Box>
        </MenuItem>
        <MenuItem>
          <SettingsIcon />
          <span>Settings</span>
        </MenuItem>
      </Menu>
    </div>
  );
});
