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

type Coordinate = {
    x: number,
    y: number,
    z: string
} 

class Driver {
    lastA : Coordinate;
    lastB: Coordinate
    gridboundsX: number;
    gridboundsY: number; 
    startAX: number;
    startAY: number;
    startAZ: string;
    startBX: number;
    startBY: number; 
    startBZ: string;
    coordinatesA: Array<Coordinate>;
    coordinatesB: Array<Coordinate>;
    
    async requestGridbounds() {    
        const {gridbounds} = await inquirer.prompt(questions.GRIDBOUNDS)
        //check if valid input
        if(!isValid.gridboundsInput(gridbounds)) {
            consola.info('Error: grid bounds must contain two integers.');
            return this.requestGridbounds(); 
        }
        //break gridbounds into 2 numbers 
        const splitGBs = gridbounds.split(' ');
        this.gridboundsX = parseInt(splitGBs[0]);
        this.gridboundsY = parseInt(splitGBs[1]); 
        return;
    }

    async requestStartA () {
        const {startA} = await inquirer.prompt(questions.START_A)
        //check if valid input
        if(!isValid.startInput(startA)) {
            consola.info('Error: starting position must contain two intergers and a heading (N, E, S, or W).');
            return this.requestStartA(); 
        }
        //break startA into 2 numbers and string heading 
        const splitStartA = startA.split(' ');
        this.startAX = parseFloat(splitStartA[0]);
        this.startAY = parseFloat(splitStartA[1]);
        this.startAZ = splitStartA[2];
        //check if startA is in bounds
        const iIBParams = {
            x: this.startAX,
            y: this.startAY,
            gridboundsX: this.gridboundsX,
            gridboundsY: this.gridboundsY
        }
        if(!isInBounds(iIBParams)){
            consola.info('Error: starting coordinates must exist within grid bounds.');
            return this.requestStartA(); 
        }      
        return;
    }

    async requestInstructionsA () {
        const {instructionsA} = await inquirer.prompt(questions.INSTRUCTIONS_A);
        //check if valid input
        if(!isValid.instructionsInput(instructionsA)) {
            consola.info('Error: instructions must only use characters L, R, and M (left, right, and move).');
            return this.requestInstructionsA(); 
        }
        //retrieve roverA coordinates
        const pPParams = {
            instructions: instructionsA,
            startX: this.startAX,
            startY: this.startAY,
            startZ: this.startAZ
        }
        this.coordinatesA = plotPath(pPParams);
        //check if path stays in bounds
        if(this.coordinatesA.some(obj => {
            const iIBParams = {
                x: obj.x,
                y: obj.y,
                gridboundsX: this.gridboundsX,
                gridboundsY: this.gridboundsY
            }
            return !isInBounds(iIBParams);
        })) {
            consola.info('Error: instructions result in rover A leaving grid bounds.');
            return this.requestInstructionsA(); 
        }
        //store first output
        this.lastA = this.coordinatesA[this.coordinatesA.length - 1];
        return;
    }

    async requestStartB () {
        const{startB} = await inquirer.prompt(questions.START_B)
        //check if valid input
        if(!isValid.startInput(startB)) {
            consola.info('Error: starting position must contain two intergers and a heading (N, E, S, or W).');
            return this.requestStartB(); 
        }
        //break startB into 2 numbers and string heading 
        const splitStartB = startB.split(' ');
        this.startBX = parseFloat(splitStartB[0]);
        this.startBY = parseFloat(splitStartB[1]);
        this.startBZ = splitStartB[2];
        //check if startB is in bounds
        const iIBParams = {
            x: this.startBX,
            y: this.startBY,
            gridboundsX: this. gridboundsX,
            gridboundsY: this.gridboundsY
        }
        if(!isInBounds(iIBParams)){
            consola.info('Error: starting coordinates must exist within grid bounds.');
            return this.requestStartB(); 
        }
        //check if rover B start is in path of rover A
        const wCParams = {
            path: this.coordinatesA,
            x: this.startBX,
            y: this.startBY
        }
        if(willCollide(wCParams)){
            consola.info('Error: rover B starting coordinates place it in rover A path.');
            return this.requestStartB(); 
        }
        return;
    }
   
    async requestInstructionsB () {
        const {instructionsB} = await inquirer.prompt(questions.INSTRUCTIONS_B);
        //check if valid input
        if(!isValid.instructionsInput(instructionsB)) {
            consola.info('Error: instructions must only use characters L, R, and M (left, right, and move).');
            return this.requestInstructionsB(); 
        }
        //retrieve roverB coordinates
        const pParams = {
            instructions: instructionsB,
            startX: this.startBX,
            startY: this.startBY,
            startZ: this.startBZ
        }
        this.coordinatesB = plotPath(pParams);
        //check if path stays in bounds
        if(this.coordinatesB.some(obj => {
            const iIBParams = {
                x: obj.x,
                y: obj.y,
                gridboundsX: this.gridboundsX,
                gridboundsY: this.gridboundsY
            }
            return !isInBounds(iIBParams);
        })) {
            consola.info('Error: instructions result in rover B leaving grid bounds.');
            return this.requestInstructionsB(); 
        }
        //check if rover A end is in path of rover B
        const wCParams = {
            path: this.coordinatesB,
            x: this.lastA.x,
            y: this.lastA.y
        }
        if(willCollide(wCParams)){
            consola.info('Error: instructions result in rover B colliding with rover A ending coordinates.');
            return this.requestInstructionsB(); 
        }
        //store second output
        this.lastB = this.coordinatesB[this.coordinatesB.length - 1];
        //prompt final question
        console.log(chalk.red('Rover A Ending Positon: ') + `${this.lastA.x} ${this.lastA.y} ${this.lastA.z}`);
        console.log(chalk.red('Rover B Ending Positon: ') + `${this.lastB.x} ${this.lastB.y} ${this.lastB.z}`);
        return;
    }
     
    async endCLI() {
        const {restart} = await inquirer.prompt(questions.RESTART);
        if(!isValid.restartInput(restart)) {
            consola.info('Error: please provide yes or no answer.');
            return this.endCLI(); 
        }
        return restart === 'yes' ? this.startCLI() : consola.info('Thank you for using Mars Rover.');    
    }

    async startCLI() {
       await this.requestGridbounds();
       await this.requestStartA();
       await this.requestInstructionsA();
       await this.requestStartB();
       await this.requestInstructionsB();
       await this.endCLI();
    }
}

//start prompt
clear();
console.log(chalk.red(figlet.textSync('Mars Rover', { horizontalLayout: 'full' })))
consola.info('Welcome to Mars Rover, a TypeScript CLI for instructing rovers on Mars.');
const driver = new Driver().startCLI(); 

module.exports = Driver; 

