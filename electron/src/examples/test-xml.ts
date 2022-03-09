import fs from 'fs';
import util from 'util';
import xml2js from 'xml2js';

const xml = '/Applications/腾讯文档.app/Contents/Info.plist';

async function run() {
  let content = await fs.readFileSync(xml, 'utf-8');
  const data = await xml2js.parseStringPromise(content);
  console.log(
    util.inspect(data, {
      depth: 4,
    })
  );
  console.log(data.plist.dict[0].dict);
}

run();

export {};
