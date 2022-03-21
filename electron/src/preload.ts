import { DataRaw, Link, ElectronExpose } from './interface';
import fs from 'fs';
import path from 'path';
import util from 'util';
import child_process from 'child_process';
import electron, { ipcRenderer } from 'electron';
import { generateLink } from './generate-link';
import _ from 'lodash';
import pkg from '../package.json';

// 只有在 preload.js 中才可以同时访问 Node.js API 和 Browser API
// 将 ipcRenderer 完全暴露给渲染进程（这不安全，比如渲染进程打开不受信任的站点后，可以随意调用所有 API，或者发起 xss 攻击）

const exec = util.promisify(child_process.exec);
const writeFile = util.promisify(fs.writeFile);

const dataPath = path.resolve(__dirname, '../data/data.json');

const writeData = async (data: DataRaw) => {
  await writeFile(dataPath, JSON.stringify(data, null, 2));
  console.log('Write data to data.json');
};

const readData = async (): Promise<DataRaw> => {
  const json = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(json) as DataRaw;
};

const expose: ElectronExpose = {
  // electron.version
  version: pkg.version,

  // 读取数据存储
  readData: readData,

  // 写入数据存储
  writeData: writeData,

  // 打开 Link
  async openLink(dest) {
    try {
      await exec(`open -a "${dest}"`);
    } catch (e) {
      console.log(e);
    }
  },

  // 生成 Links
  async generateLinks(payload, callback) {
    const newLinks = (
      await Promise.all(payload.dests.map((dest) => generateLink(dest)))
    ).filter((link): link is Link => !!link);
    const data = await readData();

    const group = _.find(data.groups, { id: payload.activatedGroupId });

    if (group) {
      group.links = _.unionBy(group.links, newLinks, 'dest');
    }

    await writeFile(
      path.resolve(__dirname, '../data/data.json'),
      JSON.stringify(data, null, 2)
    );

    console.log('Write data to data.json');

    callback(data);
  },

  // 设置暗黑模式
  async setDarkMode({ dark }) {
    ipcRenderer.send('set-dark-mode', { dark });
  },
};

electron.contextBridge.exposeInMainWorld('electron', expose);

export {};
