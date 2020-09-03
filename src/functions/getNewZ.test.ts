var {getNewZ} = require('./getNewZ');

// N: {L: 'W', R: 'E'},
// E: {L: 'N', R: 'S'},
// S: {L: 'E', R: 'W'},
// W: {L: 'S', R: 'N'} 

test('returns new direction of W', ()=> {
    expect(getNewZ('N','L')).toEqual('W');
})

test('returns new direction of E', ()=> {
    expect(getNewZ('N','R')).toEqual('E');
})

test('returns new direction of N', ()=> {
    expect(getNewZ('E','L')).toEqual('N');
})

test('returns new direction of S', ()=> {
    expect(getNewZ('E','R')).toEqual('S');
})

test('returns new direction of E', ()=> {
    expect(getNewZ('S','L')).toEqual('E');
})

test('returns new direction of W', ()=> {
    expect(getNewZ('S','R')).toEqual('W');
})

test('returns new direction of S', ()=> {
    expect(getNewZ('W','L')).toEqual('S');
})

test('returns new direction of N', ()=> {
    expect(getNewZ('W','R')).toEqual('N');
})

