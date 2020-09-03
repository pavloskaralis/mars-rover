var {getNewXY} = require('./getNewXY');

test('returns x as x + 1', ()=> {
    expect(getNewXY({x: 1, y: 1, z: 'E'})).toEqual({x: 2, y: 1, z:'E'});
})

test('returns x as x - 1', ()=> {
    expect(getNewXY({x: 1, y: 1, z: 'W'})).toEqual({x: 0, y: 1, z:'W'});
})

test('returns y as y + 1', ()=> {
    expect(getNewXY({x: 1, y: 1, z: 'N'})).toEqual({x: 1, y: 2, z:'N'});
})

test('returns y as y - 1', ()=> {
    expect(getNewXY({x: 1, y: 1, z: 'S'})).toEqual({x: 1, y: 0, z:'S'});
})