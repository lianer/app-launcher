import { Box, Menu, MenuItem } from '@mui/material';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import { Link } from '../../types/interface';
import { filter } from '../../state/Filter';
import s from './Content.module.css';
import { computeStyle } from './compute-style';
import { settings } from '../../state/Settings';
import { fuzzySearch } from './fuzzy-search';
import _ from 'lodash';

// TODO [ ] 解决输入 dd 返回了只包含一个 d 的 Link
// TODO [ ] 启动无效的 link 时给个友好的提示，并建议删除

const EmptyFC: React.FC = function () {
  return (
    <div className={s.Empty}>
      <p>将应用拖拽到此处以添加项目</p>
    </div>
  );
};

// React.FC 扩展了 children 属性
export const Content = observer<React.FC>(() => {
  const contentRef = useRef<HTMLDivElement>(null);

  // dom 结构: Content > Scroller > Link > Icon + Title
  const { scrollerStyle, linkStyle, iconStyle, titleStyle } = computeStyle(
    settings.iconSize
  );

  // 当 group 切换时滚动到顶部
  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [settings.activatedGroupId]); // eslint-disable-line react-hooks/exhaustive-deps

  const activatedGroup = _.find(settings.groups, {
    id: settings.activatedGroupId,
  });
  let links: Link[] = activatedGroup?.links ?? [];
  // 搜索词过滤
  links = links.filter((link) => fuzzySearch(link.name, filter.keywords));

  // 右键菜单
  const [contextMenu, setContextMenu] = React.useState<{
    link: Link;
    left: number;
    top: number;
  } | null>(null);

  const onContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    link: Link
  ) => {
    event.preventDefault();
    setContextMenu(
      contextMenu ? null : { link, left: event.clientX, top: event.clientY }
    );
  };

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
    <Box className={s.Content} ref={contentRef}>
      {links.length === 0 && <EmptyFC />}

      {links.length > 0 && (
        <Box className={s.Scroller} style={scrollerStyle}>
          {links.map((link) => (
            <Box
              className={classNames(s.Link, {
                [s.Active]: link === contextMenu?.link, // 右键菜单弹出的时候，继续保持 hover 效果
              })}
              key={link.name}
              style={linkStyle}
              onClick={() => openLink(link)}
              onContextMenu={(event) => {
                onContextMenu(event, link);
              }}
            >
              <Box
                className={s.Icon}
                style={{
                  backgroundImage: `url('${link.icon}')`,
                  ...iconStyle,
                }}
              ></Box>
              <Box className={s.Title} style={titleStyle}>
                {link.name}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      <Menu
        open={contextMenu !== null}
        onClose={() => handleClose()}
        anchorReference="anchorPosition"
        anchorPosition={{
          left: contextMenu?.left ?? 0,
          top: contextMenu?.top ?? 0,
        }}
      >
        <MenuItem onClick={() => handleClose(CloseType.open)}>打开</MenuItem>
        <MenuItem onClick={() => handleClose(CloseType.remove)}>删除</MenuItem>
      </Menu>
    </Box>
  );
});
