interface Params {
    x: number,
    y: number,
    z: string
}

type Return = {
    x: number,
    y: number
}

module.exports = {
    getNewXY: function (params: Params) : Return {
        const {x,y,z} = params; 
        if(['E','W'].includes(z)){
            return z === 'E' ? {x: x + 1, y} : {x: x - 1, y}
        }else{
            return z === 'N' ? {x, y: y + 1} : {x, y: y - 1}
        }
    }
}