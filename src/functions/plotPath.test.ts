var {plotPath} = require('./plotPath');

test('returns array of 1 coordinate', ()=> {
    const params = {
        instructions: 'LLRLRRLR',
        startX: 1,
        startY: 1,
        startZ: 'N'
    }
    expect(plotPath(params)).toEqual([
        {x: 1, y: 1, z: 'N'}
    ]);
});

test('returns array of 5 coordinates', ()=> {
    const params = {
        instructions: 'LMRRMMLMRR',
        startX: 1,
        startY: 1,
        startZ: 'N'
    }
    expect(plotPath(params)).toEqual([
        {x: 1, y: 1, z: 'N'},
        {x: 0, y: 1, z: 'W'},
        {x: 1, y: 1, z: 'E'},
        {x: 2, y: 1, z: 'E'},
        {x: 2, y: 2, z: 'N'},
    ]);
});

test('original test input 1', ()=> {
    const params = {
        instructions: 'LMLMLMLMM',
        startX: 1,
        startY: 2,
        startZ: 'N'
    }
    expect(plotPath(params)[5]).toEqual({x: 1, y: 3, z: 'N'});
});

test('original test input 2', ()=> {
    const params = {
        instructions: 'MMRMMRMRRM',
        startX: 3,
        startY: 3,
        startZ: 'E'
    }
    expect(plotPath(params)[6]).toEqual({x: 5, y: 1, z: 'E'});
});