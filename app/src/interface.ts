import type { IpcMain, IpcRenderer } from 'electron';
import { Simplify } from 'type-fest';

declare global {
  interface Window {
    electron: {
      version: string;
      ipcMain: IpcMain;
      ipcRenderer: IpcRenderer;
    };
  }
}

export type Link = {
  name: string;
  icon: string;
  dest: string;
};

export type DataSchema = {
  settings: {};
  keys: {};
  data: [
    {
      groupName: string;
      items: Array<FileItem | DirItem>;
    }
  ];
};

export type FileItem = {
  type: 'file';
  title: string;
  keywords: string | undefined; // isDir 时为 undefined
  icon: string;
  dest: string;
  isTop: boolean;
};

export type DirItem = Simplify<
  {
    type: 'dir';
  } & Omit<FileItem, 'type' | 'keywords'>
>;
