import { Population } from "cppn-interactive";
import { memory } from "cppn-interactive/cppn_interactive_bg";

console.log('hello');

const DIM_X = 512;
const DIM_Y = 512;
const RESOLUTION = 400;
const POPULATION_SIZE = 8;

const canvasWrapper = document.getElementById("canvas-wrapper");

let parents = [];

const selectParent = index => {
    parents.push(index);
    console.log(parents);
    if (parents.length == 2) {
        population.next_generation(parents[0], parents[1]);
        parents.length = 0;
        render();
    }
}

for (let p = 0; p < POPULATION_SIZE; p++) {
    let c = document.createElement("CANVAS");
    c.id = `canvas-${p}`;
    c.height = RESOLUTION;
    c.width = RESOLUTION;

    canvasWrapper.appendChild(c);
}

const population = Population.new(POPULATION_SIZE);

const render = () => {
    for (let p = 0; p < POPULATION_SIZE; p++) {
        let canvas = document.getElementById(`canvas-${p}`);
        canvas.onclick = () => {
            console.log(`canvas-${p}`);
            selectParent(p);
        };
        let ctx = canvas.getContext('2d');
        // let imagedata = ctx.createImageData(DIM_X, DIM_Y);

        // for (let x = 0; x < DIM_X; x++) {
        // for (let y = 0; y < DIM_Y; y++) {

        // const rgb = population.probe_individual(p, (x - DIM_X / 2) / (DIM_X / 2), (y - DIM_Y / 2) / (DIM_Y / 2));

        // const pixelindex = (y * DIM_X + x) * 4;

        // imagedata.data[pixelindex] = rgb.red();
        // imagedata.data[pixelindex + 1] = rgb.green();
        // imagedata.data[pixelindex + 2] = rgb.blue();
        // imagedata.data[pixelindex + 3] = 255;




        // ctx.fillStyle = `
        // rgb(
        //     ${rgb.red()},
        //     ${rgb.green()},
        //     ${rgb.blue()})
        // `;
        // ctx.fillRect(x, y, 1, 1);
        // }
        // }

        const resultPtr = population.probe_individual_complete(p, DIM_X, DIM_Y, RESOLUTION);
        const pixels = new Uint8ClampedArray(memory.buffer, resultPtr, RESOLUTION * RESOLUTION * 4);

        let imagedata = new ImageData(pixels, RESOLUTION, RESOLUTION);

        ctx.putImageData(imagedata, 0, 0);
    }
}

render();
