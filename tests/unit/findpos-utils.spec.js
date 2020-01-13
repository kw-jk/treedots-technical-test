import * as utils from '@/utils/findpos'

describe('findNoInDigitPosition function', () => {
    it('should return number in position correctly', () => {
        var x = "0123456789";
        var iterations = 26;
        for (var i = 0; i < iterations; i++) {
          x += x;
        }
        const digit = x
        const number = utils.findNoInDigitPosition(80000009, digit)
        expect(number).toBe("9")
    })
})