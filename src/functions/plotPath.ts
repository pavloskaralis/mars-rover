var {getNewZ} = require('./getNewZ');
var {getNewXY} = require('./getNewXY');

interface Params {
    instructions: string,
    startX: number,
    startY: number,
    startZ: string
}

type XYZReturn = {
    x: number,
    y: number,
    z: string
}

module.exports = {
    plotPath: function (params: Params) : Array<XYZReturn> {
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
                const gNXYParams = {
                    x: currentX, 
                    y: currentY, 
                    z: currentZ
                }
                const newXY = getNewXY(gNXYParams);
                coordinates.push(newXY);
                currentX = newXY.x;
                currentY = newXY.y; 
            //if L or R determine new heading
            }  else {
                currentZ = getNewZ(currentZ, splitInstructions[i]);
                //if last command is a turn, update last coordinate
                if(i === splitInstructions.length - 1){
                    coordinates[coordinates.length - 1].z = currentZ;
                }
            }
        }

        return coordinates
    }
}