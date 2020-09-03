#!/usr/bin/env node
const inquirer = require('inquirer');
const consola = require('consola');
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const questions = require('./questions');
var isValid = require('./validators');
var {isInBounds} = require('./functions/isInBounds');
var {plotPath} = require('./functions/plotPath');
var {willCollide} = require('./functions/willCollide');

//outputs
type Coordinate = {
    x: number,
    y: number,
    z: string
}
let lastA: Coordinate;
let lastB: Coordinate; 

//variables
let gridboundsX: number;
let gridboundsY: number; 
let startAX: number;
let startAY: number;
let startAZ: string;
let startBX: number;
let startBY: number; 
let startBZ: string;
let coordinatesA: Array<Coordinate>;
let coordinatesB: Array<Coordinate>;

//first question 
function requestGridbounds() {    
    inquirer.prompt(questions.GRIDBOUNDS).then(({gridbounds})=>{
        //check if valid input
        if(!isValid.gridboundsInput(gridbounds)) {
            consola.info('Error: grid bounds must contain two integers.');
            return requestGridbounds(); 
        }
        //break gridbounds into 2 numbers 
        const splitGBs = gridbounds.split(' ');
        gridboundsX = parseInt(splitGBs[0]);
        gridboundsY = parseInt(splitGBs[1]);
        //prompt second question
        return requestStartA(); 
    })
}

//second question
function requestStartA () {
    inquirer.prompt(questions.START_A).then(({startA})=>{
        //check if valid input
        if(!isValid.startInput(startA)) {
            consola.info('Error: starting position must contain two intergers and a heading (N, E, S, or W).');
            return requestStartA(); 
        }
        //break startA into 2 numbers and string heading 
        const splitStartA = startA.split(' ');
        startAX = parseFloat(splitStartA[0]);
        startAY = parseFloat(splitStartA[1]);
        startAZ = splitStartA[2];
        //check if startA is in bounds
        const iIBParams = {
            x: startAX,
            y: startAY,
            gridboundsX,
            gridboundsY
        }
        if(!isInBounds(iIBParams)){
            consola.info('Error: starting coordinates must exist within grid bounds.');
            return requestStartA(); 
        }
        //prompt third question
        requestInstructionsA();
    })  
}

//third question 
function requestInstructionsA () {
    inquirer.prompt(questions.INSTRUCTIONS_A).then(({instructionsA})=>{
        //check if valid input
        if(!isValid.instructionsInput(instructionsA)) {
            consola.info('Error: instructions must only use characters L, R, and M (left, right, and move).');
            return requestInstructionsA(); 
        }
        //retrieve roverA coordinates
        const pPParams = {
            instructions: instructionsA,
            startX: startAX,
            startY: startAY,
            startZ: startAZ
        }
        coordinatesA = plotPath(pPParams);
        //check if path stays in bounds
        if(coordinatesA.some(obj => {
            const iIBParams = {
                x: obj.x,
                y: obj.y,
                gridboundsX,
                gridboundsY
            }
            return !isInBounds(iIBParams);
        })) {
            consola.info('Error: instructions result in rover A leaving grid bounds.');
            return requestInstructionsA(); 
        }
        //store first output
        lastA = coordinatesA[coordinatesA.length - 1];
        //prompt 4th question 
        requestStartB();
    })  
}

//fourth question 
function requestStartB () {
    inquirer.prompt(questions.START_B).then(({startB})=>{
        //check if valid input
        if(!isValid.startInput(startB)) {
            consola.info('Error: starting position must contain two intergers and a heading (N, E, S, or W).');
            return requestStartB(); 
        }
        //break startB into 2 numbers and string heading 
        const splitStartB = startB.split(' ');
        startBX = parseFloat(splitStartB[0]);
        startBY = parseFloat(splitStartB[1]);
        startBZ = splitStartB[2];
        //check if startB is in bounds
        const iIBParams = {
            x: startBX,
            y: startBY,
            gridboundsX,
            gridboundsY
        }
        if(!isInBounds(iIBParams)){
            consola.info('Error: starting coordinates must exist within grid bounds.');
            return requestStartB(); 
        }
        //check if rover B start is in path of rover A
        const wCParams = {
            path: coordinatesA,
            x: startBX,
            y: startBY
        }
        if(willCollide(wCParams)){
            consola.info('Error: rover B starting coordinates place it in rover A path.');
            return requestStartB(); 
        }
        //prompt 5th question
        requestInstructionsB();
    })  
}

//fifth question
function requestInstructionsB () {
    inquirer.prompt(questions.INSTRUCTIONS_B).then(({instructionsB})=>{
        //check if valid input
        if(!isValid.instructionsInput(instructionsB)) {
            consola.info('Error: instructions must only use characters L, R, and M (left, right, and move).');
            return requestInstructionsB(); 
        }
        //retrieve roverB coordinates
        const pParams = {
            instructions: instructionsB,
            startX: startBX,
            startY: startBY,
            startZ: startBZ
        }
        coordinatesB = plotPath(pParams);
        //check if path stays in bounds
        if(coordinatesB.some(obj => {
            const iIBParams = {
                x: obj.x,
                y: obj.y,
                gridboundsX,
                gridboundsY
            }
            return !isInBounds(iIBParams);
        })) {
            consola.info('Error: instructions result in rover B leaving grid bounds.');
            return requestInstructionsB(); 
        }
        //check if rover A end is in path of rover B
        const wCParams = {
            path: coordinatesB,
            x: lastA.x,
            y: lastA.y
        }
        if(willCollide(wCParams)){
            consola.info('Error: instructions result in rover B colliding with rover A ending coordinates.');
            return requestInstructionsB(); 
        }
        //store second output
        lastB = coordinatesB[coordinatesB.length - 1];
        //prompt final question
        console.log(chalk.red('Rover A Ending Positon: ') + `${lastA.x} ${lastA.y} ${lastA.z}`);
        console.log(chalk.red('Rover B Ending Positon: ') + `${lastB.x} ${lastB.y} ${lastB.z}`);
        endCLI();
    })  
}

//final question
function endCLI() {
    inquirer.prompt(questions.RESTART).then(({restart})=>{
        if(!isValid.restartInput(restart)) {
            consola.info('Error: please provide yes or no answer.');
            return endCLI(); 
        }
        restart === 'yes' ? requestGridbounds() : consola.info('Thank you for using Mars Rover.')
    })
}

//start prompt
clear();
console.log(chalk.red(figlet.textSync('Mars Rover', { horizontalLayout: 'full' })))
consola.info('Welcome to Mars Rover, a TypeScript CLI to command 2 rovers on Mars.');
requestGridbounds();


