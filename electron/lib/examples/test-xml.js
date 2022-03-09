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
const util_1 = __importDefault(require("util"));
const xml2js_1 = __importDefault(require("xml2js"));
const xml = '/Applications/腾讯文档.app/Contents/Info.plist';
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        let content = yield fs_1.default.readFileSync(xml, 'utf-8');
        const data = yield xml2js_1.default.parseStringPromise(content);
        console.log(util_1.default.inspect(data, {
            depth: 4,
        }));
        console.log(data.plist.dict[0].dict);
    });
}
run();
