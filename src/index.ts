#!/usr/bin/env node
const inquirer = require('inquirer');
const consola = require('consola');
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const isValid = require('./validators');
const questions = require('./questions');
const {isInBounds} = require('./functions/isInBounds');

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
let coordinatesA: Array<object>;

//first question 
function requestGridbounds() {    
    inquirer.prompt(questions.GRIDBOUNDS).then(({gridbounds})=>{
        if(!isValid.gridboundsInput(gridbounds)) {
            consola.info('Error: grid bounds must contain two integers.');
            return requestGridbounds(); 
        }
        //break apart gridBounds into 2 numbers
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
        if(!isValid.startInput(startA)) {
            consola.info('Error: starting position must contain two intergers and a heading (N,E,S, or W).');
            return requestStartA(); 
        }
        const splitStartA = startA.split(' ');
        startAX = parseFloat(splitStartA[0]);
        startAY = parseFloat(splitStartA[1]);
        startAZ = splitStartA[2];
        if(!isInBounds(startAX,startAY,gridboundX,gridboundY)){
            consola.info('Error: starting coordinates must exist within grid bounds.');
            return requestStartA(); 
        }
        //prompt third question
        requestInstructionsA();
    })  
}


//third question 
function requestInstructionsA () {
    console.log('question 3')
}

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

