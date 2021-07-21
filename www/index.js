import { Population } from "cppn-interactive";
import { memory } from "cppn-interactive/cppn_interactive_bg";

console.log('hello');

let SIZE = 100;
let RESOLUTION = 300;
let POPULATION_SIZE = 8;
let SEED = 8;

const canvasWrapper = document.getElementById("canvas-wrapper");


size.value = SIZE;
size.onchange = event => {
    SIZE = event.target.value;
    render();
};

resolution.value = RESOLUTION;
resolution.onchange = event => {
    RESOLUTION = event.target.value;
    render();
};

populationSize.value = POPULATION_SIZE;
populationSize.onchange = event => {
    POPULATION_SIZE = event.target.value;
    setupPopulation();
    render();
};

seed.value = SEED;
seed.onchange = event => {
    SEED = event.target.value;
    setupPopulation();
    render();
};

let parents = [];

autoGenerations.onclick = () => {
    for (let i = 0; i < 10; i++) {
        population.next_generation(Math.floor(Math.random() * POPULATION_SIZE), Math.floor(Math.random() * POPULATION_SIZE));
    }
    render();
};

const selectParent = index => {
    parents.push(index);
    console.log(parents);
    if (parents.length == 2) {
        population.next_generation(parents[0], parents[1]);
        parents.length = 0;
        render();
    }
}

let population = Population.new(POPULATION_SIZE, SEED);

const setupPopulation = () => {
    population = Population.new(POPULATION_SIZE, SEED);
    while (canvasWrapper.firstChild) {
        canvasWrapper.removeChild(canvasWrapper.firstChild);
    }

    for (let p = 0; p < POPULATION_SIZE; p++) {
        let c = document.createElement("CANVAS");
        c.id = `canvas-${p}`;
        c.height = RESOLUTION;
        c.width = RESOLUTION;

        canvasWrapper.appendChild(c);
    }
}

const render = () => {
    console.time('render');
    for (let p = 0; p < POPULATION_SIZE; p++) {
        let canvas = document.getElementById(`canvas-${p}`);
        canvas.height = RESOLUTION;
        canvas.width = RESOLUTION;
        canvas.onclick = () => {
            console.log(`canvas-${p}`);
            selectParent(p);
        };
        let ctx = canvas.getContext('2d');

        const resultPtr = population.probe_individual_complete(p, SIZE, RESOLUTION);
        const pixels = new Uint8ClampedArray(memory.buffer, resultPtr, RESOLUTION * RESOLUTION * 4);

        let imagedata = new ImageData(pixels, RESOLUTION, RESOLUTION);

        ctx.putImageData(imagedata, 0, 0);
    }
    console.timeEnd('render');
}

setupPopulation();
render();