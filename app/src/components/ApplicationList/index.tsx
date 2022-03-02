import { AppInfo } from '../../interface';
import styles from './index.module.css';

// React.FC 扩展了 children 属性
export const ApplicationList: React.FC<{ list: AppInfo[] }> = (props) => {
  return (
    <div>
      <div>{props.children}</div>
      {props.list.map((item) => {
        return (
          <div className={styles.item} key={item.appName}>
            <img className={styles.img} src={item.icon} alt={item.appName} />
            <div className={styles.title}>{item.appName}</div>
          </div>
        );
      })}
    </div>
  );
};
