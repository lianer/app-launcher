import { settings } from './state/Settings';
import dataRaw from './data/data.json';
import { DataRaw } from './interface';

const data = dataRaw as DataRaw;

settings.importData(data);
