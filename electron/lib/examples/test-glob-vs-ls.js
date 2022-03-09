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
const util_1 = __importDefault(require("util"));
const child_process_1 = __importDefault(require("child_process"));
const glob_1 = __importDefault(require("glob"));
const exec = util_1.default.promisify(child_process_1.default.exec);
// 测试在 Applications 文件夹中，ll 和 glob 输出结果是否一致，结果：一致
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    const { stdout: r1 } = yield exec('ls -l', { cwd: '/Applications' });
    const r2 = glob_1.default.sync('/Applications/*.app');
    console.log(r2);
});
run();
