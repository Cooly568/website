import { defineConfig } from "vite";
import * as fs from "fs";

// walksync function
// adapted from https://gist.github.com/kethinov/6658166?permalink_comment_id=4581614#gistcomment-4581614
const walkSync = (dir, filelist = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = `${dir}/${file}`;
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      filelist = walkSync(filepath, filelist);
    } else {
      filelist.push(filepath);
    }
  }
  return filelist;
};

// import all html files
const html = walkSync("src").filter(path => path.includes(".html"));
const inputs = {};
html.forEach(path => {
  const name = path.replace(/src\/|\.html/, "");
  inputs[name] = path;
});

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true, // also necessary
    rollupOptions: {
      input: inputs
    }
  }
});
