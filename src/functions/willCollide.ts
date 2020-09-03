
interface Params {
    path: Array<{x: number, y: number, z: string}>,
    x: number,
    y: number
}

module.exports = {
    willCollide: function(params: Params) : boolean {
        const{path,x,y} = params;
        return path.some(obj => obj.x === x && obj.y === y)
    }
}