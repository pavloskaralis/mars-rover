const {getNewZ} = require('./getNewZ');
const {getNewXY} = require('./getNewXY');

interface Params {
    instructions: string,
    startX: number,
    startY: number,
    startZ: string
}

module.exports = {
    plotPath: function (params: Params) : Array<object> {
        const {instructions, startX, startY, startZ} = params;
        const splitInstructions = instructions.split('');
        let currentX = startX;
        let currentY = startY;
        let currentZ = startZ; 

        //output
        const coordinates = [{x: currentX, y: currentY, z: currentZ}];
        for(let i = 0; i < splitInstructions.length; i ++){
            //if M, determine coordinates and push to output
            if(splitInstructions[i] === 'M') {
                const newXY = getNewXY(currentX, currentY, currentZ);
                coordinates.push({...newXY, z: currentZ});
                currentX = newXY.x;
                currentY = newXY.y; 
            //if L or R determine new heading
            }  else {
                currentZ = getNewZ(currentZ, splitInstructions[i]);
            }

        }

        return coordinates
    }
}