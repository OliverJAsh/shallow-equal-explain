import test = require('tape');

test('foo', t => {
    console.log('bar');
    t.equal(1, 1);

    t.end();
});
