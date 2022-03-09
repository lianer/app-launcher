import { settings } from './state/Settings';
import { DataRaw } from './interface';

const importData = async () => {
  if (window.electron) {
    // In electron
    const data = await window.electron.readData();
    settings.importData(data);
  } else {
    const data = (await import('./data/data.json')) as DataRaw;
    settings.importData(data);
  }
};

importData();
