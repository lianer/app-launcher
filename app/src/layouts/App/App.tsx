import { MenuBar } from '../../components/MenuBar';
import { Content } from '../../components/Content';
import s from './App.module.css';

export const App: React.FC = () => {
  return (
    <div className={s.App}>
      <MenuBar />
      <Content />
    </div>
  );
};
