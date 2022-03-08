import { observer } from 'mobx-react';
import { Link } from '../../interface';
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

  const links =
    settings.groups.find((group) => group.id === settings.activatedGroup?.id)
      ?.links || [];

  // console.log(links[0]);
  // (window as any).temp1 = links[0]

  const openLink = (link: Link) => {
    window.electron?.openLink(link.dest);
  };

  return (
    <div className={s.Content}>
      <div
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
          <div
            className={s.Link}
            key={link.name}
            style={{
              width: size + paddingLR * 2, // padding-left/padding-right 集成到 width 中
              height: size + titleHeight,
              paddingTop: paddingTB,
              paddingBottom: paddingTB,
            }}
            onClick={() => openLink(link)}
          >
            <div
              className={s.Icon}
              style={{
                width: size,
                height: size,
                backgroundImage: `url('${link.icon}')`,
              }}
            ></div>
            <div
              className={s.Title}
              style={{
                width: size + paddingLR, // 只加一个 padding，另一个 padding 留一点边距好看一些
                height: titleHeight,
                lineHeight: `${titleHeight}px`,
                fontSize: titleFontSize,
              }}
            >
              {link.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
