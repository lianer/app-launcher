import type { IpcMain, IpcRenderer } from 'electron';

declare global {
  interface Window {
    electron: {
      version: string;
      ipcMain: IpcMain;
      ipcRenderer: IpcRenderer;
    };
  }
}

export interface AppInfo {
  appName: string;
  icon: string;
}
