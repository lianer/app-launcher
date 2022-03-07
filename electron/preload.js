const electron = require('electron');
electron.contextBridge.exposeInMainWorld('electron', electron);

// global.electron = electron;

// const { contextBridge, app, ipcMain, ipcRenderer } = require('electron');

// const pkg = require('./package.json');

// const expose = {};

// expose.version = pkg.version;

// expose.getPlatform = () => process.platform;

// expose.getApplications = function () {
//   switch (process.platform) {
//     case 'darwin':
//       const applicationDir = '/Applications';
//       const applications = fs.readdirSync(applicationDir);
//       // win.webContents.send('get-applications', applications);
//       event.reply(applications);
//       break;
//     case 'win32':
//       // do something for Windows
//       break;
//     case 'linux':
//       // do something for Linux
//       break;
//     default:
//     // do something for other OS
//   }
// };

// 只有在 preload.js 中才可以同时访问 Node.js API 和 Browser API
// 将 ipcRenderer 完全暴露给渲染进程（这不安全，比如渲染进程打开不受信任的站点后，可以随意调用所有 API，或者发起 xss 攻击）
// contextBridge.exposeInMainWorld('electron', expose);
