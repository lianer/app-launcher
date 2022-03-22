import { ElectronExpose } from './interface';

/* 全局声明的类型定义在此处，interface.ts 中有部分类型会被 electron 端的 ts 引入 */

declare global {
  interface Window {
    electron?: ElectronExpose;
    settings: DataRaw & SettingsPrototype;
  }

  interface File {
    readonly path: string;
  }
}

export {};
