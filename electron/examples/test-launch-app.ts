import path from 'path';
import util from 'util';
import child_process from 'child_process';

const exec = util.promisify(child_process.exec);

import {
  getAllApplicationIcons,
  getApplicationName,
  getApplications,
  launchApplication,
  searchApplications,
} from './test-lib';

// 启动 Sublime Text
const launchSublimeText = async function () {
  const apps = await getApplications();
  const sublimeText = searchApplications(apps, 'Sublime Text');
  if (sublimeText.length === 1) {
    const app = sublimeText[0];
    launchApplication(app.dest);
  }
};
// launchSublimeText()

// 获取 sublime 图标
const getSublimeIcon = async function () {
  const apps = await getApplications();
  const sublimeText = searchApplications(apps, 'Sublime Text');
  if (sublimeText.length === 1) {
    const app = sublimeText[0];
    const infoList = path.resolve(app.dest, 'Contents/Info.plist');
    try {
      const { stdout: iconName } = await exec(
        `defaults read "${infoList}" CFBundleIconFile`
      );
      const iconPath = path.resolve(app.dest, 'Contents/Resources/', iconName);
      console.log(iconPath);
    } catch (e) {
      throw e;
    }
  }
};
// getSublimeIcon();

// 获取所有应用程序图标
const getApps = async function () {
  let apps = await getApplications();
  apps = await getAllApplicationIcons(apps);
  apps.forEach((app) => {
    app.name = getApplicationName(app.dest);
  });
  console.log(apps);
};

getApps();
