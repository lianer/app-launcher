import path from 'path';
import { app, BrowserWindow, globalShortcut, Tray } from 'electron';
import { setKey } from './global-shortcut-key';
import { setDarkMode } from './dark-mode';

// TODO [ ] 新增设置窗口，设置更新时发送 updateSettings 消息
// TODO [ ] StatusBar Icon

const icons = {
  app: path.resolve(__dirname, '../../assets/icon', 'app-launcher-256.ico'),
  dock: path.resolve(__dirname, '../../assets/icon', 'app-launcher-256.png'),
};

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    icon: icons.app,
    webPreferences: {
      preload: path.resolve(__dirname, '../dist/preload.js'),
    },
  });

  win.webContents.openDevTools();

  win.loadURL('http://localhost:9000');

  return win;
}

app.whenReady().then(() => {
  app.dock.setIcon(icons.dock);

  setDarkMode();

  const win = createWindow();

  // 全局快捷键
  setKey(win, {
    ShowOrHideMainWindow: 'Alt+Space',
  });

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

// APP 退出
app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
