#!/usr/bin/env node
const inquirer = require('inquirer');
const consola = require('consola');
const isValid = require('./validators');
const questions = require('./questions');

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


//first question 
function requestGridbounds() {
    consola.info('Welcome to Mars Rover, a Typescript CLI to command rovers on Mars.');
    
    inquirer.prompt(questions.GRIDBOUNDS).then(({gridbounds})=>{
        if(!isValid.gridbroundsInput(gridbounds)) {
            consola.info('Error: grid bounds must contain two integers.');
            return requestGridbounds(); 
        }
        //break apart gridBounds into 2 numbers
        const splitGBs = gridbounds.split(' ');
        gridboundX = parseInt(splitGBs[0]);
        gridboundY = parseInt(splitGBs[1]);
        //prompt second question
        return requestInstructionsA(); 
    })
}

//second question

function requestInstructionsA () {
    inquirer.prompt(questions.START_A).then(({startA})=>{
        if(!isValid.instructionsInput(startA)) {
            consola.info('Error: starting position must contain two intergers and a heading (N,E,S, or W).');
            return requestInstructionsA(); 
        }
        const splitStartA = startA.split(' ');
        startAX = parseFloat(splitStartA[0]);
        startAY = parseFloat(splitStartA[1]);
        startAZ = splitStartA[2];
        //prompt second question
    })  
}

//start prompt
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

