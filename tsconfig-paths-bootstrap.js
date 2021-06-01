const tsConfig = require('./tsconfig.release.json');
const tsConfigPaths = require('tsconfig-paths');

let { baseUrl, paths } = tsConfig.compilerOptions;
for (path in paths) {
  paths[path][0] = paths[path][0]
    .replace("src", "build/src")
    .replace(".ts", ".js");
}
tsConfigPaths.register({ baseUrl, paths });
