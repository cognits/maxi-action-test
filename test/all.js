const { queryLatest } = require('../functions');
const assert = require('assert');

describe('queryLatest', function() {
    it('gets the latest version', function() {
        const testversions = [
            '2405.1.7770148',
            '2405.10.e9deebb',
            '2405.2.20550d9',
        ];
        
        const latest = queryLatest(() => testversions);
        assert.equal(latest, '2405.10.e9deebb');
    });

    it('handles no versions', function() {
        const testversions = [];
        
        const latest = queryLatest(() => testversions);
        assert.equal(latest, null);
    })
});