import { Box, Menu, MenuItem } from '@mui/material';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';
import { Link } from '../../types/interface';
import { filter } from '../../state/Filter';
import { settings } from '../../state/Settings';
import s from './Content.module.css';

// React.FC 扩展了 children 属性
export const Content: React.FC = observer(() => {
  const size = settings.iconSize;

  const marginLR = size / 10;
  const marginTB = size / 10;
  const paddingLR = size / 3;
  const paddingTB = size / 5;

  const titleHeight = size / 2;
  const titleFontSize = titleHeight * (3 / 8); // 字体大小为标题高度的 3/8，在图标为 64px 的情况下，刚好获得 12px 的字号

  // filter
  // TODO: 解决输入 dd 返回了只包含一个 d 的 Link
  let links =
    settings.groups.find((group) => group.id === settings.activatedGroupId)
      ?.links || [];
  const keywords = filter.keywords;
  if (keywords.trim() !== '') {
    keywords.split('').forEach((keyword) => {
      links = links.filter((link) => {
        // 英文不区分大小写
        if (/[a-zA-Z]/.test(keyword)) {
          return (
            link.name.includes(keyword.toUpperCase()) ||
            link.name.includes(keyword.toLowerCase())
          );
        }
        // 其他字符精确匹配
        return link.name.includes(keyword);
      });
    });
  }

  // 右键图标
  const [contextMenu, setContextMenu] = React.useState<{
    link: Link;
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const onContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    link: Link
  ) => {
    event.preventDefault();
    setContextMenu(
      contextMenu
        ? null
        : { link, mouseX: event.clientX, mouseY: event.clientY }
    );
  };

  // console.log(links[0]);
  // (window as any).temp1 = links[0]

  const openLink = (link: Link) => {
    window.electron?.openLink(link.dest);
  };

  const removeLink = (link: Link) => {
    const linkDests = [link.dest];
    settings.removeLinks(settings.activatedGroupId, linkDests);
  };

  // 关闭右键菜单
  enum CloseType {
    'open',
    'remove',
  }

  const handleClose = (type?: CloseType) => {
    setContextMenu(null);
    switch (type) {
      case CloseType.open:
        contextMenu?.link && openLink(contextMenu.link);
        break;
      case CloseType.remove:
        contextMenu?.link && removeLink(contextMenu.link);
        break;
      default:
        console.log('Do nothing');
    }
  };

  return (
    <Box className={s.Content}>
      <Box
        className={s.Scroller}
        style={{
          gridTemplateColumns: `repeat(auto-fill, ${
            size + marginLR * 2 + paddingLR * 2
          }px)`,
          gridTemplateRows: `repeat(auto-fill, ${
            size + marginTB * 2 + paddingTB * 2 + titleHeight
          }px)`,
          gridColumnGap: `${marginLR}px`,
          gridRowGap: `${marginTB}px`,
        }}
      >
        {links.map((link) => (
          <Box
            className={classNames(s.Link, {
              [s.Active]: contextMenu !== null && link === contextMenu.link, // 右键菜单弹出的时候，继续保持 hover 效果
            })}
            key={link.name}
            style={{
              width: size + paddingLR * 2, // padding-left/padding-right 集成到 width 中
              height: size + titleHeight,
              paddingTop: paddingTB,
              paddingBottom: paddingTB,
            }}
            onClick={() => openLink(link)}
            onContextMenu={(event) => {
              onContextMenu(event, link);
            }}
          >
            <Box
              className={s.Icon}
              style={{
                width: size,
                height: size,
                backgroundImage: `url('${link.icon}')`,
              }}
            ></Box>
            <Box
              className={s.Title}
              style={{
                width: size + paddingLR, // 只加一个 padding，另一个 padding 留一点边距好看一些
                height: titleHeight,
                lineHeight: `${titleHeight}px`,
                fontSize: titleFontSize,
              }}
            >
              {link.name}
            </Box>
          </Box>
        ))}
      </Box>
      <Menu
        open={contextMenu !== null}
        onClose={() => handleClose()}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? {
                left: contextMenu.mouseX,
                top: contextMenu.mouseY,
              }
            : undefined
        }
      >
        <MenuItem onClick={() => handleClose(CloseType.open)}>打开</MenuItem>
        <MenuItem onClick={() => handleClose(CloseType.remove)}>删除</MenuItem>
      </Menu>
    </Box>
  );
});
