import React from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Box,
  Slider,
  ListItemIcon,
  Typography,
  ListItemText,
  Divider,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import CropFreeIcon from '@mui/icons-material/CropFree';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import AppsIcon from '@mui/icons-material/Apps';
import ViewListIcon from '@mui/icons-material/ViewList';
import s from './More.module.css';
import { observer } from 'mobx-react';
import { settings } from '../../state/Settings';
import classNames from 'classnames';

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
    <div className={classNames(s.More, open && s.Active)}>
      <IconButton onClick={handleClick}>
        <MoreVertIcon fontSize="small" />
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
        <MenuItem disableRipple>
          <ListItemIcon>
            <IconButton>
              <AppsIcon fontSize="small" />
            </IconButton>
          </ListItemIcon>
          <ListItemIcon>
            <IconButton>
              <ViewListIcon fontSize="small" />
            </IconButton>
          </ListItemIcon>
        </MenuItem>

        <Divider />

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
