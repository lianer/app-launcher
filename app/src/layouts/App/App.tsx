import { MenuBar } from '../../components/MenuBar';
import { Content } from '../../components/Content';
import linksRaw from '../../data/links.json';
import { Link } from '../../interface';
import s from './App.module.css';

const links = linksRaw as Link[];

// links.forEach((link) => (link.icon = '/qq-music.png'));

export const App: React.FC = () => {
  return (
    <div className={s.App}>
      <MenuBar />
      <Content list={links} />
    </div>
  );
};
