#!/usr/bin/env node
import fs from 'fs';
import fsPromises from 'fs/promises';
import fse from 'fs-extra';
import path from 'path';
import prompt from 'prompt-promise';

const templatedirectory = path.resolve(import.meta.dirname, "../template");
const currentdirectory = process.cwd();

async function checkdirectoryempty(path) {
    try {
        const directorycontent = await fsPromises.readdir(path);
        return directorycontent.length === 0;
    } catch { return true; }
}

async function createproject(name) {
    const target = path.join(currentdirectory, name);
    const dirempty = fs.existsSync(target) ? await checkdirectoryempty(target) : true;

    if (!dirempty) {
        console.error(`${target} already exists :(`);
        process.exit(1);
    }

    if (!fs.existsSync(target)) fs.mkdirSync(target);

    try {
        await fse.copy(templatedirectory, target);
        console.log("Created successfully :)");
        console.log("Install dependencies:");
        console.log(" - \"npm i\"");
        console.log(" - \"yarn\"");
        console.log(" - \"pnpm i\"");
        console.log(" - \"bun i\"");
        console.log("Build:");
        console.log(" - \"npm run build\"");
        console.log(" - \"yarn build\"");
        console.log(" - \"pnpm run build\"");
        console.log(" - \"bun run build\"");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

let name = await prompt("Directory name? (type . for current directory):");
await createproject(name);