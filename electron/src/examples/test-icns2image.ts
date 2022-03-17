import path from 'path';
import { execFile } from 'child_process';
import util from 'util';

const execFilePrms = util.promisify(execFile);

const run = async function () {
  const icns2image = path.resolve(__dirname, '../../bin/icns2image');
  const out = path.resolve(__dirname, './dist/qq-music.png');
  const src = path.resolve(__dirname, 'assets/qq-music.icns');

  // ./bin/icns2image -r 512 -t png ./src/examples/assets/qq-music.icns ./src/examples/dist/qq-music.png
  await execFilePrms(icns2image, ['-t png', src, out]);
};

run();

export {};
