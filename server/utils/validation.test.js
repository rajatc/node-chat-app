const expect = require('expect');

var {isRealString} = require('./validation.js');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        var value = 90;
        var test = isRealString(value);

        expect(test).toBe(false);
    });

    it('should reject string with only spaces', () => {
        var res = isRealString('   ');
        expect(res).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        var res = isRealString('This is a test');
        expect(res).toBe(true);
    });
});