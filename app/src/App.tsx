import './assets/normalize.css';
import './App.css';
import { ApplicationList } from './components/ApplicationList';
import { AppInfo } from './interface';

function App() {
  const appInfoList: AppInfo[] = [
    {
      appName: 'QQ 音乐',
      icon: '/qq-music.png',
    },
  ];

  return (
    <div className="App">
      <ApplicationList list={appInfoList} />
    </div>
  );
}

export default App;
