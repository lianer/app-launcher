import { settings } from './state/Settings';
import dataRaw from './data/data.json';
import { DataRaw } from './interface';

if (window.electron) {
  // In electron
  const data = window.electron.getData();
  settings.importData(data);
} else {
  const data = dataRaw as DataRaw;
  settings.importData(data);
}
