const File = require('./file');
const { join } = require('path');

(async () => {
  const sourceFile = join(__dirname, "..", "source.json");
  const destFile = join(__dirname, "..", "dest.json");

  let content = await File.read(sourceFile);

  content = content.replace(/{/gi, `JSON_OBJECT (`);
  content = content.replace(/}/gi, `RETURNING CLOB)`);
  content = content.replace(/"(\w+)":\s".+"/gi, `'$1' VALUE '#$1#'`);
  content = content.replace(/"(\w+)"\s*:\s*\d+/gi, `'$1' VALUE 999999`);
  content = content.replace(/"(\w+)"\s*:\s*(FALSE|TRUE|false|true)/gi, `'$1' VALUE '$2' format json`);
  content = content.replace(/"(\w+)": JSON_OBJECT \(/gi, `'$1' VALUE JSON_OBJECT (`);
  content = content.replace(/"(\w+)"\s*:\s*\[/gi, `'$1' VALUE JSON_ARRAYAGG (`);
  content = content.replace(/]/gi, `RETURNING CLOB)`);
  content = content.replace(/"/gi, `'`);
  content = content.replace(/:/gi, `value`);

  File.write(destFile, content);
 
})();