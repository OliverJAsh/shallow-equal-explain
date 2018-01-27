// Copied from https://github.com/facebook/fbjs/blob/7da8335b78d669cba263760872f0a45ed16b4d12/packages/fbjs/src/core/__tests__/shallowEqual-test.js

import test = require('tape');

import { shallowEqualExplain } from '../src/index';
import {
    Explaination,
    PropertyExplaination,
    TopLevelDifferentExplaination,
} from '../src/types';

test('returns false if either argument is null', t => {
    t.deepEqual(
        shallowEqualExplain(null, {}),
        Explaination.TopLevelDifferent({
            explaination: TopLevelDifferentExplaination.NotObjectOrNull({}),
        }),
    );
    t.deepEqual(
        shallowEqualExplain({}, null),
        Explaination.TopLevelDifferent({
            explaination: TopLevelDifferentExplaination.NotObjectOrNull({}),
        }),
    );

    t.end();
});

test('returns true if both arguments are null or undefined', t => {
    t.deepEqual(shallowEqualExplain(null, null), Explaination.TopLevelSame({}));
    t.deepEqual(
        shallowEqualExplain(undefined, undefined),
        Explaination.TopLevelSame({}),
    );

    t.end();
});

test('returns true if arguments are not objects and are equal', t => {
    t.deepEqual(shallowEqualExplain(1, 1), Explaination.TopLevelSame({}));

    t.end();
});

test('returns true if arguments are objects and are equal', t => {
    const objA = {};
    const objB = objA;
    t.deepEqual(shallowEqualExplain(objA, objB), Explaination.TopLevelSame({}));

    t.end();
});

test('returns true if arguments are shallow equal', t => {
    t.deepEqual(
        shallowEqualExplain({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 }),
        Explaination.PropertiesSame({}),
    );

    t.end();
});

test('returns true when comparing NaN', t => {
    t.deepEqual(shallowEqualExplain(NaN, NaN), Explaination.TopLevelSame({}));

    t.deepEqual(
        shallowEqualExplain(
            { a: 1, b: 2, c: 3, d: NaN },
            { a: 1, b: 2, c: 3, d: NaN },
        ),
        Explaination.PropertiesSame({}),
    );

    t.end();
});

test('returns false if arguments are not objects and not equal', t => {
    t.deepEqual(
        shallowEqualExplain(1, 2),
        Explaination.TopLevelDifferent({
            explaination: TopLevelDifferentExplaination.NotObjectOrNull({}),
        }),
    );

    t.end();
});

test('returns false if only one argument is not an object', t => {
    t.deepEqual(
        shallowEqualExplain(1, {}),
        Explaination.TopLevelDifferent({
            explaination: TopLevelDifferentExplaination.NotObjectOrNull({}),
        }),
    );

    t.end();
});

test('returns false if first argument has too many keys', t => {
    t.deepEqual(
        shallowEqualExplain({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 }),
        Explaination.TopLevelDifferent({
            explaination: TopLevelDifferentExplaination.NonMatchingKeys({}),
        }),
    );

    t.end();
});

test('returns false if second argument has too many keys', t => {
    t.deepEqual(
        shallowEqualExplain({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 }),
        Explaination.TopLevelDifferent({
            explaination: TopLevelDifferentExplaination.NonMatchingKeys({}),
        }),
    );

    t.end();
});

test('returns false if arguments are not shallow equal', t => {
    t.deepEqual(
        shallowEqualExplain({ a: 1, b: 2, c: {} }, { a: 1, b: 2, c: {} }),
        Explaination.PropertiesDifferent({
            explaination: {
                a: PropertyExplaination.Same({}),
                b: PropertyExplaination.Same({}),
                c: PropertyExplaination.Different({}),
            },
        }),
    );

    t.end();
});
