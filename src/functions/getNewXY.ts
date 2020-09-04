interface Params {
    x: number,
    y: number,
    z: string
}

type XYReturn = {
    x: number,
    y: number,
    z: string
}

module.exports = {
    getNewXY: function (params: Params) : XYReturn {
        const {x,y,z} = params; 
        if(['E','W'].includes(z)){
            switch (z) {
                case 'E' : return {x: x + 1, y, z};
                case 'W' : return {x: x - 1, y, z};
            }
        }else{
            switch (z) {
                case 'N' :  return {x, y: y + 1, z};
                case 'S' : return {x, y: y - 1, z};
            }
        }
    }
}