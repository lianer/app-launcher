import { BrowserWindow, ipcMain, nativeTheme } from 'electron';

export const setDarkMode = function () {
  ipcMain.on('set-dark-mode', (event, { dark }) => {
    nativeTheme.themeSource = dark;
  });
};
