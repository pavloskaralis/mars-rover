interface Params {
    x: number, 
    y: number,
    gridboundsX: number,
    gridboundsY: number
}

module.exports = {
    isInBounds: function (params: Params){
        const {x,y,gridboundsX,gridboundsY} = params; 
        return x >= 0 && x <= gridboundsX && y >= 0 && y <= gridboundsY ? true : false
    }
}