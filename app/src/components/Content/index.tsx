import { observer } from 'mobx-react';
import { Link } from '../../interface';
import { iconSize } from '../../mobx/IconSize';
import s from './index.module.css';

// React.FC 扩展了 children 属性
export const Content: React.FC<{ list: Link[] }> = observer((props) => {
  const size = iconSize.size;

  return (
    <div className={s.Content}>
      {props.list.map((link) => {
        return (
          <div className={s.Link} key={link.name}>
            <div
              className={s.Icon}
              style={{
                width: size,
                height: size,
                backgroundImage: `url('${link.icon}')`,
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
