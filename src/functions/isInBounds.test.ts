var {isInBounds} = require('./isInBounds');

describe('testing grid bound min', () => {
    test('returns false when x is less than 0', ()=> {
        expect(isInBounds({x: -1, y: 1, gridboundsX: 5, gridboundsY: 5})).toBe(false);
    });
    
    test('returns false when y is less than 0', ()=> {
        expect(isInBounds({x: 1, y: -1, gridboundsX: 5, gridboundsY: 5})).toBe(false);
    });

    test('returns true when x and y fall equal grid bound min', ()=> {
        expect(isInBounds({x: 0, y: 0, gridboundsX: 5, gridboundsY: 5})).toBe(true);
    }); 
})

describe('testing grid bound max', () => {
    test('returns false when x is greater than x bound', ()=> {
        expect(isInBounds({x: 6, y: 1, gridboundsX: 5, gridboundsY: 5})).toBe(false);
    });
    
    test('returns false when y is greater than y bound', ()=> {
        expect(isInBounds({x: 1, y: 6, gridboundsX: 5, gridboundsY: 5})).toBe(false);
    });
     
    test('returns true when x and y fall equal grid bound max', ()=> {
        expect(isInBounds({x: 5, y: 5, gridboundsX: 5, gridboundsY: 5})).toBe(true);
    });
})

