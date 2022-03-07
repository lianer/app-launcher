import os from 'os';
import fs from 'fs';
import path from 'path';
import util from 'util';
import child_process from 'child_process';
import glob from 'glob';

const platform = os.platform();
const exec = util.promisify(child_process.exec);
const exists = util.promisify(fs.exists);

type App = { name?: string; dest: string; icon?: string };

const isString = function (dest: string | null): dest is string {
  return dest !== null;
};

// 获取应用程序列表
export const getApplications = async function (): Promise<App[]> {
  if (platform === 'darwin') {
    const unfilteredApps = await glob.sync('/Applications/*.app');
    const filterTasks = unfilteredApps.map((dest) =>
      exists(`${dest}/Contents/Info.plist`).then((exists) =>
        exists ? dest : null
      )
    );
    const detectedApps = await Promise.all(filterTasks);
    return detectedApps.filter(isString).map((dest) => ({ dest }));
  } else {
    throw new Error('unknown platform');
  }
};

// 搜索应用程序
export const searchApplications = function (
  apps: App[],
  keywords: string
): App[] {
  return apps.filter((app) => app.dest.includes(keywords));
};

// 启动应用程序
export const launchApplication = async function (dest: string): Promise<void> {
  try {
    if (platform === 'darwin') {
      await exec(`open -n "${dest}"`);
    }
  } catch (err) {
    throw err;
  }
};

// 获取应用程序图标
export const getApplicationIcon = async function (
  dest: string
): Promise<string> {
  try {
    if (platform === 'darwin') {
      const infoList = path.resolve(dest, 'Contents/Info.plist');
      let { stdout: iconName } = await exec(
        `defaults read "${infoList}" CFBundleIconFile`
      );

      // defaults read 结果默认带个 \n 换行符
      iconName = iconName.trim();

      // iconName 有带和不带 .icns 后缀的两种情况
      iconName = iconName.endsWith('.icns') ? iconName : iconName + '.icns';

      return path.resolve(dest, 'Contents/Resources/', iconName);
    } else {
      return '';
    }
  } catch (e) {
    throw e;
  }
};

// 获取所有应用图标
export const getAllApplicationIcons = function (apps: App[]) {
  const wrapApp = async function (dest: App['dest']): Promise<App> {
    const icon = await getApplicationIcon(dest);
    return { dest, icon };
  };
  const tasks = apps.map(({ dest }) => wrapApp(dest));
  return Promise.all(tasks);
};

// 解析应用名称
export const getApplicationName = function (dest: App['dest']) {
  return path.basename(dest).slice(0, -4);
};
