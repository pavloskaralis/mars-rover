module.exports = {
    isInBounds: function (x: number, y: number, gbX: number, gbY: number){
        return x >= 0 && x <= gbX && y >= 0 && y <= gbY? true : false
    }
}