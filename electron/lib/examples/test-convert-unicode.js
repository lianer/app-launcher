"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// default read 有些情况会返回 unicode 编码
// 注意 \u817e 和 \\u817e 是不一样的，前者是 unicode 编码，后者是转义字符
let str1 = '\u817e\u8baf\u6587\u6863.icns'; // 这种情况是有效的 unicode 编码，\u 表示 unicode 编码
console.log(str1 === '腾讯文档.icns'); // unicode 编码是无需转义的，可以和
let str2 = '\\u817e\\u8baf\\u6587\\u6863.icns'; // 这种情况不是有效的 unicode，\\u 表示的是普通的 \u 字符串
str2 = JSON.parse(`"${str2}"`); // 需要通过 JSON.parse 进行一次转义
console.log(str2 === '腾讯文档.icns');
