var {getNewZ} = require('../getNewZ');

describe('current heading as N', () => {
    test('returns new heading of W when turning left', ()=> {
        expect(getNewZ('N','L')).toBe('W');
    })
    
    test('returns new heading of E when turning right', ()=> {
        expect(getNewZ('N','R')).toBe('E');
    })
})

describe('current heading as E', ()=> {
    test('returns new heading of N when turning left', ()=> {
        expect(getNewZ('E','L')).toBe('N');
    })
    
    test('returns new heading of S when turning right', ()=> {
        expect(getNewZ('E','R')).toBe('S');
    })
})

describe('current heading as S', ()=> {
    test('returns new heading of E when turning left', ()=> {
        expect(getNewZ('S','L')).toBe('E');
    })
    
    test('returns new heading of W when turning right', ()=> {
        expect(getNewZ('S','R')).toBe('W');
    })
})

describe('current heading as W', ()=> {
    test('returns new heading of S when turning left', ()=> {
        expect(getNewZ('W','L')).toBe('S');
    })
    
    test('returns new heading of N when turning right', ()=> {
        expect(getNewZ('W','R')).toBe('N');
    })
})








