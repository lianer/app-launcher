import os from 'os';
import fs from 'fs';
import path from 'path';
import util from 'util';
import child_process from 'child_process';
import { Link } from './interface';

const exec = util.promisify(child_process.exec);
const execFile = util.promisify(child_process.execFile);
const exists = util.promisify(fs.exists);
const stat = util.promisify(fs.stat);
const writeFile = util.promisify(fs.writeFile);

const platform = os.platform();
const unicodePattern = /\\u/;
const useFileIcon = false;

// 解析 Link 名称
export const getLinkName = async function (dest: string): Promise<string> {
  if (platform === 'darwin') {
    if (await isApplication(dest)) {
      // 有些应用程序的 CFBundleDisplayName 是英文，或变量，也可能没有该值
      // const infoList = path.resolve(dest, 'Contents/Info.plist');
      // let { stdout: name } = await exec(
      //   `defaults read "${infoList}" CFBundleDisplayName`
      // );
      // defaults read 结果默认带个 \n 换行符
      // name = name.trim();

      // 简单暴力的通过来路径来识别，兼容性也最好，缺点是只能用真实的文件名称，不支持多国语言
      // return path.basename(dest).slice(0, -4);
      return path.parse(dest).name;
    } else {
      return path.basename(dest);
    }
  } else {
    return '';
  }
};

const isApplication = async (dest: string) => {
  if (!dest.endsWith('.app')) {
    return false;
  }
  const existing = await exists(`${dest}/Contents/Info.plist`).then((exists) =>
    exists ? dest : null
  );
  return existing;
};

const isIOSApplication = async (dest: string) => {
  return false;
};

const isFile = async (dest: string) => {
  return (await stat(dest)).isFile();
};

const isDir = async (dest: string) => {
  return (await stat(dest)).isDirectory();
};

// 获取应用程序图标
export const getLinkIcon = async function (
  name: string,
  dest: string
): Promise<string> {
  if (platform === 'darwin') {
    // 应用程序
    if (await isApplication(dest)) {
      const out = path.resolve(
        __dirname,
        '../../app/public/icons/',
        name + '.png'
      );

      if (useFileIcon) {
        // 这里提取了 file-icon 库提供的 file-icon 二进制文件
        // 由于 file-icon 库是由 esmodule 规范编写的，无法很好的与当前项目结合，因此将核心代码提取出来使用
        // 实测提取出来的图标的色彩度略有失真，不如 defaults read 方法
        // https://github.com/sindresorhus/file-icon/blob/main/index.js
        const fileIconCLI = path.resolve(__dirname, '../file-icon');
        const args = [JSON.stringify([{ appOrPID: dest, size: 1024 }])];
        const options = {
          encoding: null,
          maxBuffer: 1024 * 1024 * 100,
        };
        const { stdout: buffer } = await execFile(fileIconCLI, args, options);
        await writeFile(out, buffer);
      } else {
        const infoList = path.resolve(dest, 'Contents/Info.plist');
        let { stdout: iconName } = await exec(
          `defaults read "${infoList}" CFBundleIconFile`
        );

        // defaults read 结果默认带个 \n 换行符
        iconName = iconName.trim();

        // iconName 有带和不带 .icns 后缀的两种情况
        iconName = iconName.endsWith('.icns') ? iconName : iconName + '.icns';

        // iconName 存在 unicode 编码的情况
        // https://developer.apple.com/forums/thread/682103
        // https://stackoverflow.com/questions/147824/how-to-find-whether-a-particular-string-has-unicode-characters-esp-double-byte
        if (unicodePattern.test(iconName)) {
          iconName = JSON.parse(`"${iconName}"`);
        }

        const src = path.resolve(dest, 'Contents/Resources/', iconName);
        const out = path.resolve(
          __dirname,
          '../../../app/public/icons/',
          name + '.png'
        );

        await convertIcnsToPng(src, out);
      }

      const icon = '/icons/' + name + '.png';
      return icon;
    } else if (await isIOSApplication(dest)) {
      return '';
    } else if (await isFile(dest)) {
      return '';
    } else if (await isDir(dest)) {
      return '';
    } else {
      return '';
    }
  } else {
    return '';
  }
};

// 将 icns 转换为 png
export const convertIcnsToPng = async function (src: string, out: string) {
  // 需要确保目标目录存在，否则会报错
  // 处理部分应用程序的图标会报错，比如：飞书 Lark
  // sips -s format png /Applications/XMind.app/Contents/Resources/XMind.icns --out /Users/lianer/dev/repos/app-launcher/electron/assets/icons/XMind.png
  return await exec(`sips -s format png "${src}" --out "${out}"`);
};

// 生成 Link 实例
export const generateLink = async (dest: string): Promise<Link | void> => {
  const link: Link = {
    dest: dest,
    name: '',
    icon: '',
  };

  link.name = await getLinkName(dest);
  if (!link.name) return;

  try {
    link.icon = await getLinkIcon(link.name, dest);
    if (!link.icon) return;
  } catch (e) {
    console.error('GET_LINK_ICON_ERROR', e);
    return;
  }

  return link;
};
