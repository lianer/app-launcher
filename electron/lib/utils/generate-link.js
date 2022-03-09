"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLink = exports.convertIcnsToPng = exports.getLinkIcon = exports.getLinkName = void 0;
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const child_process_1 = __importDefault(require("child_process"));
const exec = util_1.default.promisify(child_process_1.default.exec);
const exists = util_1.default.promisify(fs_1.default.exists);
const stat = util_1.default.promisify(fs_1.default.stat);
const platform = os_1.default.platform();
const unicodePattern = /\\u/;
// 解析 Link 名称
const getLinkName = function (dest) {
    return __awaiter(this, void 0, void 0, function* () {
        if (platform === 'darwin') {
            if (yield isApplication(dest)) {
                // 有些应用程序的 CFBundleDisplayName 是英文，或变量，也可能没有该值
                // const infoList = path.resolve(dest, 'Contents/Info.plist');
                // let { stdout: name } = await exec(
                //   `defaults read "${infoList}" CFBundleDisplayName`
                // );
                // defaults read 结果默认带个 \n 换行符
                // name = name.trim();
                // 简单暴力的通过来路径来识别，兼容性也最好，缺点是只能用真实的文件名称，不支持多国语言
                return path_1.default.basename(dest).slice(0, -4);
            }
            else {
                return path_1.default.basename(dest);
            }
        }
        else {
            return '';
        }
    });
};
exports.getLinkName = getLinkName;
const isApplication = (dest) => __awaiter(void 0, void 0, void 0, function* () {
    if (!dest.endsWith('.app')) {
        return false;
    }
    const existing = yield exists(`${dest}/Contents/Info.plist`).then((exists) => exists ? dest : null);
    return existing;
});
const isIOSApplication = (dest) => __awaiter(void 0, void 0, void 0, function* () {
    return false;
});
const isFile = (dest) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield stat(dest)).isFile();
});
const isDir = (dest) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield stat(dest)).isDirectory();
});
// 获取应用程序图标
const getLinkIcon = function (name, dest) {
    return __awaiter(this, void 0, void 0, function* () {
        if (platform === 'darwin') {
            // 应用程序
            if (yield isApplication(dest)) {
                const infoList = path_1.default.resolve(dest, 'Contents/Info.plist');
                let { stdout: iconName } = yield exec(`defaults read "${infoList}" CFBundleIconFile`);
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
                const icnsSrc = path_1.default.resolve(dest, 'Contents/Resources/', iconName);
                const pngOut = path_1.default.resolve(__dirname, '../../../app/public/icons/', name + '.png');
                const icon = '/icons/' + name + '.png';
                yield (0, exports.convertIcnsToPng)(icnsSrc, pngOut);
                return icon;
            }
            else if (yield isIOSApplication(dest)) {
                return '';
            }
            else if (yield isFile(dest)) {
                return '';
            }
            else if (yield isDir(dest)) {
                return '';
            }
            else {
                return '';
            }
        }
        else {
            return '';
        }
    });
};
exports.getLinkIcon = getLinkIcon;
// 将 icns 转换为 png
const convertIcnsToPng = function (src, out) {
    return __awaiter(this, void 0, void 0, function* () {
        // 需要确保目标目录存在，否则会报错
        // sips -s format png /Applications/XMind.app/Contents/Resources/XMind.icns --out /Users/lianer/dev/repos/app-launcher/electron/assets/icons/XMind.png
        return yield exec(`sips -s format png "${src}" --out "${out}"`);
    });
};
exports.convertIcnsToPng = convertIcnsToPng;
// 生成 Link 实例
const generateLink = (dest) => __awaiter(void 0, void 0, void 0, function* () {
    const link = {
        dest: dest,
        name: '',
        icon: '',
    };
    link.name = yield (0, exports.getLinkName)(dest);
    if (!link.name)
        return;
    link.icon = yield (0, exports.getLinkIcon)(link.name, dest);
    if (!link.icon)
        return;
    return link;
});
exports.generateLink = generateLink;
