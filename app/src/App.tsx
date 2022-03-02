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
    {
      appName: '微信',
      icon: '/wechat.png',
    },
    {
      appName: '支付宝',
      icon: '/alipay.png',
    },
  ];

  // window.electron.ipcRenderer.send('get-applications');
  // window.electron.ipcRenderer.on('get-applications', (event, applications) => {
  //   console.log(applications);
  // });

  return (
    <div className="App">
      <ApplicationList list={appInfoList} />
    </div>
  );
}

export default App;
