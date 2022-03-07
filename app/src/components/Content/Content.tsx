import { observer } from 'mobx-react';
import { Link } from '../../interface';
import { iconSize } from '../../state/IconSize';
import s from './Content.module.css';

// React.FC 扩展了 children 属性
export const Content: React.FC<{ list: Link[] }> = observer((props) => {
  const size = iconSize.size;
  const margin = size / 8;
  const padding = size / 8;
  const wrapWidth = size + margin * 2 + padding * 2;
  const wrapHeight = wrapWidth + 20;

  return (
    <div
      className={s.Content}
      id="content"
      style={{
        gridTemplateColumns: `repeat(auto-fill, ${wrapWidth}px)`,
        gridTemplateRows: `repeat(auto-fill, ${wrapHeight}px)`,
        gridGap: `${margin}px`,
      }}
    >
      {props.list.map((link) => {
        const icon = 'https://i.niupic.com/images/2022/03/07/9W7l.png';
        return (
          <div
            className={s.Link}
            key={link.name}
            style={{ width: size, padding: padding }}
          >
            <div
              className={s.Icon}
              style={{
                width: size,
                height: size,
                backgroundImage: `url('${icon}')`,
              }}
            ></div>
            <div className={s.Title} style={{ width: size }}>
              {link.name}
            </div>
          </div>
        );
      })}
    </div>
  );
});
