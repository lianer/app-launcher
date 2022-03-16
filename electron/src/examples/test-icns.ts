import fs from 'fs';
import path from 'path';
import * as png2icons from 'png2icons';

/**
 * 该文件验证通过 Buffer 操作解析 MacOS icns 文件
 * icns 文件是 MacOS 特有的图片文件格式，它不是一张图片，而是若干图片的集合
 * icns 的内容编码由几十个`区块`组成，每个区块都是一张图片，都有文件类型、文件大小和文件内容组成
 * 其中第一个区块是 icns 文件相关的内容，从第 2 个开始的区块才是真正的图片区块，包括 ICN# icm# icm4 ic07 ic08 ic09 等等
 * 详见 Apple Icon Image format https://en.wikipedia.org/wiki/Apple_Icon_Image_format
 *
 * 每个区块组成如下（示例）：
 * 0-4: icns // 文件格式
 * 4-8: 1768124019 // 文件大小
 * 8-end: // 文件内容
 */

const fetchHeader = function (buffer: Buffer) {
  const id = buffer.toString('ascii', 0, 4);
  const bytes = buffer.readUInt32BE(4);
  const data = Buffer.alloc(8);
  data.write(id, 0, 4, 'ascii');
  data.writeUInt32BE(bytes, 4);
  return {
    bytes,
    data,
  };
};

const run = async function () {
  const src = '/Applications/XMind.app/Contents/Resources/XMind.icns';
  const out = path.resolve(__dirname, 'dist', 'out.png');
  const raw = fs.readFileSync(src);
  const header = fetchHeader(raw);
  let index = header.data.length;

  while (index < raw.length) {
    const buffer = raw.slice(index);

    // icns 格式文件的编码组成
    // 0-4: ascii 文件格式
    // 5-8: 文件大小
    // 8-end: 图片数据

    // icns 中前 4 位编码用于记录文件格式，转 ascii 码，取 0-4 位的编码
    // 前四个字符取出，对应 osType 中的值
    // Buffer.from  buffer.toString  等 Buffer 相关的操作函数默认使用 utf-8 编码，可以通过参数指定编码
    const osType = buffer.toString('ascii', 0, 4);

    // 返回 1 个无符号的 32 位的大字节，从 offset 4 开始读取
    // 32 位以 4 个字节为一个单位进行读取，此处返回的是第 4-8 个字节
    // 这 4-8 4 个字节（不含 8）用于描述文件大小，4 个字节支持描述 256^4 大小的文件（4G）
    // https://nodejs.org/api/buffer.html#buffer_buf_readuint32be_offset
    const bytes = buffer.readUInt32BE(4);

    // 图片数据，从 offset 8 开始
    const image = buffer.slice(8, bytes);

    // 分配 8 个字节
    const _buffer = Buffer.alloc(8);

    // 将图片类型编码写入新 buffer 的 offset 0-4
    _buffer.write(osType, 0, 4, 'ascii');

    // 将无符号的 32 位大字节写入新 buffer，写入位置在 offset 4 之后（也就是 5-8）
    _buffer.writeUInt32BE(bytes, 4);

    // 将新 buffer 与 image buffer 合并，返回又一个新的 buffer
    // data 与原始 buffer 的内容其实是一样的
    const data = Buffer.concat([_buffer, image]);

    // console.log({
    //   osType,
    //   data,
    //   image,
    // });

    // fs.writeFileSync(
    //   out,
    //   Buffer.concat([
    //     Buffer.from([0x89, 0x50, 0x4e, 0x47]),
    //     buffer.slice(4, bytes),
    //     // buffer.slice(4, 8),
    //     // image,
    //   ])
    // );

    const newFile = png2icons.createICO(image, png2icons.BILINEAR, 0, true);
    if (newFile) {
      console.log(osType);
      // png2icons 支持将这些格式转换成 ico
      // ic07
      // ic08
      // ic09
      // ic10
      // ic11
      // ic12
      // ic13
      // ic14
      fs.writeFileSync(out.replace('.png', '.ico'), newFile);
    }

    index += bytes;
  }
};

run();

export {};
