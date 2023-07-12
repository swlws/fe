import {SourceMapConsumer} from  "source-map"
import fs from "fs"
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const filepath=  path.resolve(__dirname, "./index-4b24df9e.js.map")

const map_row = fs.readFileSync(filepath, "utf-8")

function fn (errorInfo){
    const [bundleName, line, column] = errorInfo.split(':')
    SourceMapConsumer.with(map_row, null, (customer) => {
        const pos = customer.originalPositionFor({
            line: parseInt(line),
            column: parseInt(column)
        })

        console.log('bundle name' ,bundleName)
        console.log('origin position' ,pos)
    })
}

fn("index-4b24df9e.js:1:717")