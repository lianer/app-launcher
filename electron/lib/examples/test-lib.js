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
exports.convertIcnsToPng = exports.getApplicationName = exports.getAllApplicationIcons = exports.getApplicationIcon = exports.launchApplication = exports.searchApplications = exports.getApplications = void 0;
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const child_process_1 = __importDefault(require("child_process"));
const glob_1 = __importDefault(require("glob"));
const platform = os_1.default.platform();
const exec = util_1.default.promisify(child_process_1.default.exec);
const exists = util_1.default.promisify(fs_1.default.exists);
// const unicodePattern = /[^\u0000-\u00ff]/;
const unicodePattern = /\\u/;
const isString = function (dest) {
    return dest !== null;
};
// 获取应用程序列表
const getApplications = function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (platform === 'darwin') {
            const unfilteredApps = yield glob_1.default.sync('/Applications/*.app');
            const filterTasks = unfilteredApps.map((dest) => exists(`${dest}/Contents/Info.plist`).then((exists) => exists ? dest : null));
            const detectedApps = yield Promise.all(filterTasks);
            return detectedApps.filter(isString).map((dest) => ({ dest }));
        }
        else {
            throw new Error('unknown platform');
        }
    });
};
exports.getApplications = getApplications;
// 搜索应用程序
const searchApplications = function (apps, keywords) {
    return apps.filter((app) => app.dest.includes(keywords));
};
exports.searchApplications = searchApplications;
// 启动应用程序
const launchApplication = function (dest) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (platform === 'darwin') {
                yield exec(`open -n "${dest}"`);
            }
        }
        catch (err) {
            throw err;
        }
    });
};
exports.launchApplication = launchApplication;
// 获取应用程序图标
const getApplicationIcon = function (dest) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (platform === 'darwin') {
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
                return path_1.default.resolve(dest, 'Contents/Resources/', iconName);
            }
            else {
                return '';
            }
        }
        catch (e) {
            throw e;
        }
    });
};
exports.getApplicationIcon = getApplicationIcon;
// 获取所有应用图标
const getAllApplicationIcons = function (apps) {
    const wrapApp = function (dest) {
        return __awaiter(this, void 0, void 0, function* () {
            const icon = yield (0, exports.getApplicationIcon)(dest);
            return { dest, icon };
        });
    };
    const tasks = apps.map(({ dest }) => wrapApp(dest));
    return Promise.all(tasks);
};
exports.getAllApplicationIcons = getAllApplicationIcons;
// 解析应用名称
const getApplicationName = function (dest) {
    return path_1.default.basename(dest).slice(0, -4);
};
exports.getApplicationName = getApplicationName;
// 将 icns 转换为 png
const convertIcnsToPng = function (src, out) {
    return __awaiter(this, void 0, void 0, function* () {
        // 需要确保目标目录存在，否则会报错
        // sips -s format png /Applications/XMind.app/Contents/Resources/XMind.icns --out /Users/lianer/dev/repos/app-launcher/electron/assets/icons/XMind.png
        return yield exec(`sips -s format png "${src}" --out "${out}"`);
    });
};
exports.convertIcnsToPng = convertIcnsToPng;
