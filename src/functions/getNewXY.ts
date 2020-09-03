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
            return z === 'E' ? {x: x + 1, y, z} : {x: x - 1, y, z}
        }else{
            return z === 'N' ? {x, y: y + 1, z} : {x, y: y - 1, z}
        }
    }
}