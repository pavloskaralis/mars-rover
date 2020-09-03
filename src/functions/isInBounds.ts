interface Params {
    x: number, 
    y: number,
    grindboundsX: number,
    grindboundsY: number
}

module.exports = {
    isInBounds: function (params: Params){
        const {x,y,grindboundsX,grindboundsY} = params; 
        return x >= 0 && x <= grindboundsX && y >= 0 && y <= grindboundsY? true : false
    }
}