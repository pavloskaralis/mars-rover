var {getNewZ} = require('./getNewZ');

test('returns new direction of W', ()=> {
    expect(getNewZ('N','L')).toBe('W');
})

test('returns new direction of E', ()=> {
    expect(getNewZ('N','R')).toBe('E');
})

test('returns new direction of N', ()=> {
    expect(getNewZ('E','L')).toBe('N');
})

test('returns new direction of S', ()=> {
    expect(getNewZ('E','R')).toBe('S');
})

test('returns new direction of E', ()=> {
    expect(getNewZ('S','L')).toBe('E');
})

test('returns new direction of W', ()=> {
    expect(getNewZ('S','R')).toBe('W');
})

test('returns new direction of S', ()=> {
    expect(getNewZ('W','L')).toBe('S');
})

test('returns new direction of N', ()=> {
    expect(getNewZ('W','R')).toBe('N');
})

