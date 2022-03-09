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
const electron_1 = __importDefault(require("electron"));
const generate_link_1 = require("./utils/generate-link");
const lodash_1 = __importDefault(require("lodash"));
const exec = util_1.default.promisify(child_process_1.default.exec);
const writeFile = util_1.default.promisify(fs_1.default.writeFile);
// 只有在 preload.js 中才可以同时访问 Node.js API 和 Browser API
// 将 ipcRenderer 完全暴露给渲染进程（这不安全，比如渲染进程打开不受信任的站点后，可以随意调用所有 API，或者发起 xss 攻击）
const expose = {
    openLink: (dest) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield exec(`open -a "${dest}"`);
        }
        catch (e) {
            console.log(e);
        }
    }),
    getData: () => {
        const json = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../data/data.json'), 'utf8');
        return JSON.parse(json);
    },
    postLinks: (payload, callback) => __awaiter(void 0, void 0, void 0, function* () {
        const newLinks = (yield Promise.all(payload.dests.map((dest) => (0, generate_link_1.generateLink)(dest)))).filter((link) => !!link);
        const json = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../data/data.json'), 'utf8');
        const data = JSON.parse(json);
        const group = lodash_1.default.find(data.groups, { id: payload.activatedGroupId });
        if (group) {
            group.links = lodash_1.default.unionBy(group.links, newLinks, 'dest');
        }
        yield writeFile(path_1.default.resolve(__dirname, '../data/data.json'), JSON.stringify(data, null, 2));
        console.log('Write data to data.json');
        callback(data);
    }),
};
electron_1.default.contextBridge.exposeInMainWorld('electron', expose);
