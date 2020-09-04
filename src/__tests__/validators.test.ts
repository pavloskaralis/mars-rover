var isValid = require('../validators');


describe('start input', () => {
   
    test('returns false if it does not contain 2 whole numbers', ()=> {
        expect(isValid.startInput('5 N')).toBe(false);
    });

    test('returns false if it does not contain 2 whole numbers', ()=> {
        expect(isValid.startInput('-1 5 N')).toBe(false);
    });

    test('returns false if it does not contain a heading', ()=> {
        expect(isValid.startInput('5 5')).toBe(false);
    })

    test('returns false if no heading (N, E, S, or W)', ()=> {
        expect(isValid.startInput('5 5 R')).toBe(false);
    })
    
    test('returns true if it contains 2 whole numbers and a heading', ()=> {
        expect(isValid.startInput('5 5 N')).toBe(true);
    })
     
})

describe('instructions input', () => {
    test('returns false if it contains a character other than L, R, or M', ()=> {
        expect(isValid.instructionsInput('LRMXMRL')).toBe(false);
    })
    
    test('returns true if it contains only L, R, or M characters', ()=> {
        expect(isValid.instructionsInput('LRMMRL')).toBe(true);
    })
    
    test('returns true if single character', ()=> {
        expect(isValid.instructionsInput('L')).toBe(true);
    })
})

describe('grid bounds input', () => {
   
    test('returns false if it does not contain 2 integers', ()=> {
        expect(isValid.gridboundsInput('5')).toBe(false);
    });

    test('returns false if it does not contain 2 integers', ()=> {
        expect(isValid.gridboundsInput('5 0')).toBe(false);
    });

    test('returns false if it contains more than 2 integers', ()=> {
        expect(isValid.gridboundsInput('5 0 3')).toBe(false);
    });

    test('returns true if it contains only 2 integers', ()=> {
        expect(isValid.gridboundsInput('5 3')).toBe(true);
    });
   
    test('can contain 0 if not by itself', ()=> {
        expect(isValid.gridboundsInput('05 30')).toBe(true);
    });
})

describe('restart input', () => {
   
    test('returns false if neither yes or no', ()=> {
        expect(isValid.restartInput('maybe')).toBe(false);
    });
    
    test('returns true if yes', ()=> {
        expect(isValid.restartInput('yes')).toBe(true);
    });

    test('returns true if no', ()=> {
        expect(isValid.restartInput('no')).toBe(true);
    });
})