var {willCollide} = require('../willCollide');

test('returns true when coordinate blocks path', ()=> {
    const params = {
        path: [
            {x: 1, y: 1, z: 'N'},
            {x: 1, y: 2, z: 'N'},
            {x: 2, y: 2, z: 'E'}
        ],
        x: 1,
        y: 2
    }
    expect(willCollide(params)).toBe(true);
});

test('returns false when coordinate does not block path', ()=> {
    const params = {
        path: [
            {x: 1, y: 1, z: 'N'},
            {x: 1, y: 2, z: 'N'},
            {x: 2, y: 2, z: 'E'}
        ],
        x: 1,
        y: 3
    }
    expect(willCollide(params)).toBe(false);
});
