import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const framesDir = 'frames';

const frames = fs.readdirSync(framesDir)
    .filter(f => f.endsWith('png'))
    .sort((a, b) => parseInt(a) - parseInt(b));

const gridWidth = 53;
const girdHeight = 7;
const gridArea = gridWidth * girdHeight;

// const pallete = 
//     --contribution-default-bgColor-0: #151b23; 00 A
//     --contribution-default-bgColor-1: #033a16; 01 B
//     --contribution-default-bgColor-2: #196c2e; 10 C
//     --contribution-default-bgColor-3: #2ea043; 11 D 
//     --contribution-default-bgColor-4: #56d364; 001 E

const indices = [];
for(let [i, frame] of frames.entries()) {
    console.log(`Processing frame: ${i + 1} of ${frames.length}`);
    const fp = path.join(framesDir, frame);
    const { data } = await sharp(fp)
        .resize({ width: gridWidth, height: girdHeight, fit: 'fill', kernel: 'lanczos2' })
        .raw()
        .toBuffer({ resolveWithObject: true })

    for(let i = 0; i < gridArea; i++) {
        const r = data[i * 3];
        const g = data[i * 3 + 1];
        const b = data[i * 3 + 2];
        const l = (r + g + b) / 3 / 255;
        const colIdx = Math.round(l * 4);
        indices.push(colIdx);
    }
}

fs.writeFileSync("frameData", indices.join(''));