#!/usr/bin/env node
const inquirer = require('inquirer');
const consola = require('consola');
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const isValid = require('./validators');
const questions = require('./questions');
const {isInBounds} = require('./functions/isInBounds');
const {plotPath} = require('./functions/plotPath');

//outputs
type Coordinate = {
    x: number,
    y: number,
    z: string
}
let lastA: Coordinate;
let lastB: Coordinate; 

//variables
let gridboundX: number;
let gridboundY: number; 
let startAX: number;
let startAY: number;
let startAZ: string;
let startBX: number;
let startBY: number; 
let startBZ: string;
let coordinatesA: Array<Coordinate>;

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
        gridboundX = parseInt(splitGBs[0]);
        gridboundY = parseInt(splitGBs[1]);
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
            gridboundX,
            gridboundY
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
        const cAParams = {
            instructions: instructionsA,
            startX: startAX,
            startY: startAY,
            startZ: startAZ
        }
        coordinatesA = plotPath(cAParams);
        //check if path stays in bounds
        if(coordinatesA.some(obj => {
            const iIBParams = {
                x: obj.x,
                y: obj.y,
                gridboundX,
                gridboundY
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
    console.log(lastA)
    // inquirer.prompt(questions.START_A).then(({startA})=>{
    //     //check if valid input
    //     if(!isValid.startInput(startA)) {
    //         consola.info('Error: starting position must contain two intergers and a heading (N, E, S, or W).');
    //         return requestStartA(); 
    //     }
    //     //break startA into 2 numbers and string heading 
    //     const splitStartA = startA.split(' ');
    //     startAX = parseFloat(splitStartA[0]);
    //     startAY = parseFloat(splitStartA[1]);
    //     startAZ = splitStartA[2];
    //     //check if startA is in bounds
    //     const iIBParams = {
    //         x: startAX,
    //         y: startAY,
    //         gridboundX,
    //         gridboundY
    //     }
    //     if(!isInBounds(iIBParams)){
    //         consola.info('Error: starting coordinates must exist within grid bounds.');
    //         return requestStartA(); 
    //     }
    //     //prompt third question
    //     requestInstructionsA();
    // })  
}

//fifth question

//start prompt
clear();
console.log(chalk.red(figlet.textSync('Mars Rover', { horizontalLayout: 'full' })))
consola.info('Welcome to Mars Rover, a Typescript CLI to command rovers on Mars.');
requestGridbounds();


// const QUESTIONS = [
//     {
//       name: 'project-choice',
//       type: 'input',
//       message: 'If You Ready To Make Your Project witcha boi Big Poppa Code Select Which Lesson You Are On or else press CTRL + C',
//       choices: null
//     }
//   ];


// inquirer.prompt(QUESTIONS)

