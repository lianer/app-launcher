const util = require('util');
const child_process = require('child_process');
const electron = require('electron');

const exec = util.promisify(child_process.exec);

// 只有在 preload.js 中才可以同时访问 Node.js API 和 Browser API
// 将 ipcRenderer 完全暴露给渲染进程（这不安全，比如渲染进程打开不受信任的站点后，可以随意调用所有 API，或者发起 xss 攻击）

const expose = {};

expose.openLink = async (dest) => {
  try {
    await exec(`open -a "${dest}"`);
  } catch (e) {
    console.log(e);
  }
};

electron.contextBridge.exposeInMainWorld('electron', expose);
