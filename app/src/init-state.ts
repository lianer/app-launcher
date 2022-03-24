import { settings } from './state/Settings';
import { DataRaw } from './types/interface';

// TODO [ ] 监听 electron 发送的 updateSettings 消息，更新 settings

const importData = async () => {
  if (window.electron) {
    // In electron
    const data = await window.electron.readData();
    settings.importData(data);
  } else {
    const data = (await import('./data/data.json')).default as DataRaw;
    settings.importData(data);
  }
};

importData();
