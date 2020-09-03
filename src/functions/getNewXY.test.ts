var {getNewXY} = require('./getNewXY');


describe('x coordinate change', () => {
    test('returns as x + 1', ()=> {
        expect(getNewXY({x: 1, y: 1, z: 'E'})).toEqual({x: 2, y: 1, z:'E'});
    })
    
    test('returns as x - 1', ()=> {
        expect(getNewXY({x: 1, y: 1, z: 'W'})).toEqual({x: 0, y: 1, z:'W'});
    })
})

describe('y coordinate change', () => {
    test('returns as y + 1', ()=> {
        expect(getNewXY({x: 1, y: 1, z: 'N'})).toEqual({x: 1, y: 2, z:'N'});
    })
    
    test('returns as y - 1', ()=> {
        expect(getNewXY({x: 1, y: 1, z: 'S'})).toEqual({x: 1, y: 0, z:'S'});
    })
})

