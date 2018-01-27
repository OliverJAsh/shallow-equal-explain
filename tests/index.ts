// Copied from https://github.com/facebook/fbjs/blob/7da8335b78d669cba263760872f0a45ed16b4d12/packages/fbjs/src/core/__tests__/shallowEqual-test.js

import test = require('tape');

import { shallowEqual } from '../src/index';

test('returns false if either argument is null', t => {
    t.equal(shallowEqual(null, {}), false);
    t.equal(shallowEqual({}, null), false);

    t.end();
});

test('returns true if both arguments are null or undefined', t => {
    t.equal(shallowEqual(null, null), true);
    t.equal(shallowEqual(undefined, undefined), true);

    t.end();
});

test('returns true if arguments are not objects and are equal', t => {
    t.equal(shallowEqual(1, 1), true);

    t.end();
});

test('returns true if arguments are shallow equal', t => {
    t.equal(shallowEqual({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 }), true);

    t.end();
});

test('returns true when comparing NaN', t => {
    t.equal(shallowEqual(NaN, NaN), true);

    t.equal(
        shallowEqual(
            { a: 1, b: 2, c: 3, d: NaN },
            { a: 1, b: 2, c: 3, d: NaN },
        ),
        true,
    );

    t.end();
});

test('returns false if arguments are not objects and not equal', t => {
    t.equal(shallowEqual(1, 2), false);

    t.end();
});

test('returns false if only one argument is not an object', t => {
    t.equal(shallowEqual(1, {}), false);

    t.end();
});

test('returns false if first argument has too many keys', t => {
    t.equal(shallowEqual({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 }), false);

    t.end();
});

test('returns false if second argument has too many keys', t => {
    t.equal(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 }), false);

    t.end();
});

test('returns false if arguments are not shallow equal', t => {
    t.equal(shallowEqual({ a: 1, b: 2, c: {} }, { a: 1, b: 2, c: {} }), false);

    t.end();
});
