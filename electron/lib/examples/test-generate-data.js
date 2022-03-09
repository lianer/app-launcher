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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = __importDefault(require("util"));
const child_process_1 = __importDefault(require("child_process"));
const exec = util_1.default.promisify(child_process_1.default.exec);
const test_lib_1 = require("./test-lib");
// 启动 Sublime Text
const launchSublimeText = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const apps = yield (0, test_lib_1.getApplications)();
        const sublimeText = (0, test_lib_1.searchApplications)(apps, 'Sublime Text');
        if (sublimeText.length === 1) {
            const app = sublimeText[0];
            (0, test_lib_1.launchApplication)(app.dest);
        }
    });
};
// launchSublimeText()
// 获取 sublime 图标
const getSublimeIcon = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const apps = yield (0, test_lib_1.getApplications)();
        const sublimeText = (0, test_lib_1.searchApplications)(apps, 'Sublime Text');
        if (sublimeText.length === 1) {
            const app = sublimeText[0];
            const infoList = path_1.default.resolve(app.dest, 'Contents/Info.plist');
            try {
                const { stdout: iconName } = yield exec(`defaults read "${infoList}" CFBundleIconFile`);
                const iconPath = path_1.default.resolve(app.dest, 'Contents/Resources/', iconName);
                console.log(iconPath);
            }
            catch (e) {
                throw e;
            }
        }
    });
};
// getSublimeIcon();
// 获取所有应用程序图标
// const getApps = async function () {
//   let apps = await getApplications();
//   apps = await getAllApplicationIcons(apps);
//   apps.forEach((app) => {
//     app.name = getApplicationName(app.dest);
//   });
//   console.log(apps);
// };
// getApps();
// 将所有应用程序图标导出 png
const generate = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let apps = yield (0, test_lib_1.getApplications)();
        // 补充 name 字段
        apps.forEach((app) => {
            app.name = (0, test_lib_1.getApplicationName)(app.dest);
        });
        // 补充 icon
        yield Promise.all(apps.map((app) => __awaiter(this, void 0, void 0, function* () {
            return yield (0, test_lib_1.getApplicationIcon)(app.dest).then((icns) => __awaiter(this, void 0, void 0, function* () {
                const out = path_1.default.resolve(__dirname, '../../app/public/icons', app.name + '.png');
                const { stdout, stderr } = yield (0, test_lib_1.convertIcnsToPng)(icns, out);
                if (stderr) {
                    console.log(stderr);
                    console.log(icns, out);
                }
                app.icon = '/icons/' + app.name + '.png';
                return out;
            }));
        })));
        console.log('All ICNS ICON have been coverted to PNG');
        const generatedApps = apps;
        // 补充 store 对象
        const data = {
            iconSize: 100,
            activatedGroup: null,
            groups: [
                {
                    id: 0,
                    name: '收藏',
                    links: generatedApps.filter((app) => ['Authy Desktop', 'Google Chrome', 'Kindle', 'Safari'].includes(app.name)),
                },
                {
                    id: 1,
                    name: '应用程序',
                    links: apps,
                },
                {
                    id: 2,
                    name: 'Movies',
                    links: [],
                },
                {
                    id: 3,
                    name: 'Music',
                    links: [],
                },
            ],
        };
        // 导出 json
        const out = path_1.default.resolve(__dirname, '../../electron/data/data.json');
        fs_1.default.writeFileSync(out, JSON.stringify(data, null, 2));
        console.log(`The ${out} is generated`);
    });
};
generate();
