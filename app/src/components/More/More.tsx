import React from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Slider,
  ListItemIcon,
  Typography,
  ListItemText,
  Divider,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import CropFreeIcon from '@mui/icons-material/CropFree';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import AppsIcon from '@mui/icons-material/Apps';
import ViewListIcon from '@mui/icons-material/ViewList';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import s from './More.module.css';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { settings } from '../../state/Settings';

// TODO [ ] 新增设置窗口，并将 DarkMode 切换等功能迁移至设置窗口

const ITEM_HEIGHT = 80;

export const More: React.FC = observer(() => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const showMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  // const setDarkMode = (dark: 'system' | 'light' | 'dark') => {
  //   window.electron?.setDarkMode({ dark });
  // };

  return (
    <div className={classNames(s.More, open && s.Active)}>
      <IconButton onClick={showMenu}>
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        {/* 
        <MenuItem disableRipple>
          <ListItemIcon>
            <IconButton
              className={s.System}
              onClick={() => setDarkMode('system')}
            >
              <Brightness4Icon fontSize="small" />
            </IconButton>
          </ListItemIcon>
          <ListItemIcon>
            <IconButton
              className={s.Light}
              onClick={() => setDarkMode('light')}
            >
              <LightModeIcon fontSize="small" />
            </IconButton>
          </ListItemIcon>
          <ListItemIcon>
            <IconButton className={s.Dark} onClick={() => setDarkMode('dark')}>
              <ModeNightIcon fontSize="small" />
            </IconButton>
          </ListItemIcon>
        </MenuItem>

        <Divider />
        */}

        <MenuItem>
          <ListItemIcon>
            <CropFreeIcon />
          </ListItemIcon>
          <Slider
            size="small"
            value={settings.iconSize}
            max={128}
            min={48}
            step={8}
            marks={[{ label: '', value: 64 }]}
            valueLabelDisplay="auto"
            onChange={(ev, val) => {
              settings.setIconSize(val as number);
            }}
          />
        </MenuItem>

        <Divider />

        <MenuItem disableRipple>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>设置</ListItemText>
          <Typography variant="body2" color="text.secondary">
            ⌘ + ,
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
});
