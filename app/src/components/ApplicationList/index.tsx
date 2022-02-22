import { AppInfo } from '../../interface';
import styles from './index.module.css';

export function ApplicationList({ list }: { list: AppInfo[] }) {
  return (
    <div>
      {list.map((item) => {
        return (
          <div className={styles.item} key={item.appName}>
            <img className={styles.img} src={item.icon} alt={item.appName} />
            <div className={styles.title}>{item.appName}</div>
          </div>
        );
      })}
    </div>
  );
}
