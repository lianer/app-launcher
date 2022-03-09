const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');

const resolve = (...args) => path.resolve(__dirname, ...args);

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: resolve('lib/preload.js'),
    },
  });

  win.webContents.openDevTools();

  win.loadURL('http://localhost:9000');
}

app.whenReady().then(() => {
  createWindow();

  // 如果没有窗口打开则打开一个窗口 (macOS)​
  // 因为窗口无法在 ready 事件前创建，你应当在你的应用初始化后仅监听 activate 事件
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 关闭所有窗口时退出应用 (Windows & Linux)​
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
