import { BrowserWindow, globalShortcut } from 'electron';

enum Fns {
  ShowOrHideMainWindow = 'ShowOrHideMainWindow',
}

type KeyMap = Record<Fns, string>;

export const setKey = function (win: BrowserWindow, keyMap: KeyMap) {
  for (const fn in keyMap) {
    if (!Object.prototype.hasOwnProperty.call(keyMap, fn)) continue;

    try {
      switch (fn) {
        case Fns.ShowOrHideMainWindow:
          globalShortcut.register(keyMap[Fns.ShowOrHideMainWindow], () => {
            console.log(`key ${Fns.ShowOrHideMainWindow} is pressed`);
            if (win.isVisible()) {
              win.hide();
            } else {
              win.show();
            }
            // win.webContents.on('did-finish-load', () => {
            win.webContents.send('ping', 'whoooooooh!');
            // });
          });
      }
    } catch (e) {
      console.error(e);
    }
  }
};
