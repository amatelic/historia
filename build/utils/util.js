"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
exports.delay = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));
function writeFileSyncRecursive(filename, content, charset = 'utf8') {
    const folders = filename.split(path.sep).slice(0, -1);
    if (folders.length) {
        // create folder path if it doesn't exist
        folders.reduce((last, folder) => {
            const folderPath = last ? last + path.sep + folder : folder;
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }
            return folderPath;
        });
    }
    fs.writeFileSync(filename, content, charset);
}
exports.writeFileSyncRecursive = writeFileSyncRecursive;
exports.go = (promise) => {
    return promise
        .then(value => [null, value])
        .catch(err => [err, null]);
};
//# sourceMappingURL=util.js.map