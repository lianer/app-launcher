import util from 'util';
import child_process from 'child_process';
import glob from 'glob';

const exec = util.promisify(child_process.exec);

// 测试在 Applications 文件夹中，ll 和 glob 输出结果是否一致，结果：一致
const run = async () => {
  const { stdout: r1 } = await exec('ls -l', { cwd: '/Applications' });
  const r2 = glob.sync('/Applications/*.app');
  console.log(r2);
};

run();

export {};
