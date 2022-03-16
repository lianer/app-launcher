import fs from 'fs';
import path from 'path';

/**
 * 测试 png 文件编码的获取和拼接
 * png 文件编码组成如下：
 * 0-4: [0x89, 0x50, 0x4e, 0x47] // 用 16 进制表示
 * 4-8: 1768124019 // 文件大小
 * 8-end: // 文件内容
 */

const pngPath = '/Users/lianer/Downloads/qq-music.png';
const out = path.resolve(__dirname, 'dist', 'out.png');

const buffer = fs.readFileSync(pngPath);

// buffer 0-4 描述了文件类型，其中 PNG 只占 3 个字节，还有一个字节通过十六进制 89 填充
// 89 对应的十进制为 137，超出了 ascii 的范围，因此此处返回的是 137
const fileType = buffer.toString('ascii', 0, 4);

// BufferEncoding: "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "base64url" | "latin1" | "binary" | "hex"
console.log('ascii', buffer.toString(`ascii`, 0, 4));
console.log('utf8', buffer.toString(`utf8`, 0, 4));
console.log('utf16le', buffer.toString(`utf16le`, 0, 4));
console.log('ucs2', buffer.toString(`ucs2`, 0, 4));
console.log('base64', buffer.toString(`base64`, 0, 4));
console.log('base64url', buffer.toString(`base64url`, 0, 4));
console.log('latin1', buffer.toString(`latin1`, 0, 4));
console.log('binary', buffer.toString(`binary`, 0, 4));
console.log('hex', buffer.toString(`hex`, 0, 4));

const size = buffer.readUInt32BE(4);
console.log('size', size);

const content = buffer.toString('hex', 8);
// console.log('content', content);

const m1 = Buffer.alloc(4);
m1.writeUInt32BE(size, 0);

// 成立
// console.log(
//   'header compare',
//   Buffer.compare(
//     Buffer.concat([buffer.slice(0, 4), m1, Buffer.from(content, 'hex')]),
//     buffer
//   )
// );

// 成立
// console.log(
//   'header compare',
//   Buffer.compare(
//     Buffer.concat([buffer.slice(0, 8), Buffer.from(content, 'hex')]),
//     buffer
//   )
// );

// // 不成立
// const newPng = Buffer.alloc(buffer.length);
// newPng.write(fileType, 0, 4, 'ascii');
// newPng.writeUInt32BE(size, 4);
// // newPng.write(content, 8, 'hex');
// console.log(Buffer.concat([newPng, buffer.slice(8)]).compare(buffer));

// 不成立
// const newPng = Buffer.concat([
//   Buffer.from('\tPNG', 'ascii'),
//   buffer.slice(4, 8),
//   buffer.slice(8),
// ]);
// console.log(newPng.compare(buffer));

// 对比取出的 buffer.slice(0, 4) 和 构造的 是否相同
// \tPNG 与 buffer.slice(0, 4) 不等
const type = [0x89, 0x50, 0x4e, 0x47];
const encode = '';
console.log(buffer.slice(0, 4), Buffer.from(type));
console.log(Buffer.compare(buffer.slice(0, 4), Buffer.from(type)));

fs.writeFileSync(
  out,
  Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47]), buffer.slice(4, size)])
);

export {};
