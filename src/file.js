const { writeFile, readFile } = require('fs/promises');

class File {
  static async read(filePath) {

    const fileContent = await readFile(filePath, 'utf8');

    return fileContent;
  }

  static write(filePath, content) {
    return writeFile(filePath, content);
  }
}

module.exports = File;