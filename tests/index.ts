// Copied from https://github.com/facebook/fbjs/blob/7da8335b78d669cba263760872f0a45ed16b4d12/packages/fbjs/src/core/__tests__/shallowEqual-test.js

import test = require('tape');

import { shallowEqualExplain } from '../src/index';
import {
    Explanation,
    ObjectDifferentExplanation,
    PropertyExplanation,
} from '../src/types';

test('returns false if either argument is null', t => {
    t.deepEqual(
        shallowEqualExplain(null, {}),
        Explanation.ObjectDifferent({
            explanation: ObjectDifferentExplanation.NotObjectOrNull({}),
        }),
    );
    t.deepEqual(
        shallowEqualExplain({}, null),
        Explanation.ObjectDifferent({
            explanation: ObjectDifferentExplanation.NotObjectOrNull({}),
        }),
    );

    t.end();
});

test('returns true if both arguments are null or undefined', t => {
    t.deepEqual(shallowEqualExplain(null, null), Explanation.ObjectSame({}));
    t.deepEqual(
        shallowEqualExplain(undefined, undefined),
        Explanation.ObjectSame({}),
    );

    t.end();
});

test('returns true if arguments are not objects and are equal', t => {
    t.deepEqual(shallowEqualExplain(1, 1), Explanation.ObjectSame({}));

    t.end();
});

test('returns true if arguments are objects and are equal', t => {
    const objA = {};
    const objB = objA;
    t.deepEqual(shallowEqualExplain(objA, objB), Explanation.ObjectSame({}));

    t.end();
});

test('returns true if arguments are shallow equal', t => {
    t.deepEqual(
        shallowEqualExplain({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 }),
        Explanation.PropertiesSame({}),
    );

    t.end();
});

test('returns true when comparing NaN', t => {
    t.deepEqual(shallowEqualExplain(NaN, NaN), Explanation.ObjectSame({}));

    t.deepEqual(
        shallowEqualExplain(
            { a: 1, b: 2, c: 3, d: NaN },
            { a: 1, b: 2, c: 3, d: NaN },
        ),
        Explanation.PropertiesSame({}),
    );

    t.end();
});

test('returns false if arguments are not objects and not equal', t => {
    t.deepEqual(
        shallowEqualExplain(1, 2),
        Explanation.ObjectDifferent({
            explanation: ObjectDifferentExplanation.NotObjectOrNull({}),
        }),
    );

    t.end();
});

test('returns false if only one argument is not an object', t => {
    t.deepEqual(
        shallowEqualExplain(1, {}),
        Explanation.ObjectDifferent({
            explanation: ObjectDifferentExplanation.NotObjectOrNull({}),
        }),
    );

    t.end();
});

test('returns false if first argument has too many keys', t => {
    t.deepEqual(
        shallowEqualExplain({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 }),
        Explanation.ObjectDifferent({
            explanation: ObjectDifferentExplanation.NonMatchingKeys({}),
        }),
    );

    t.end();
});

test('returns false if second argument has too many keys', t => {
    t.deepEqual(
        shallowEqualExplain({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 }),
        Explanation.ObjectDifferent({
            explanation: ObjectDifferentExplanation.NonMatchingKeys({}),
        }),
    );

    t.end();
});

test('returns false if arguments are not shallow equal', t => {
    t.deepEqual(
        shallowEqualExplain({ a: 1, b: 2, c: {} }, { a: 1, b: 2, c: {} }),
        Explanation.PropertiesDifferent({
            explanation: {
                a: PropertyExplanation.Same({}),
                b: PropertyExplanation.Same({}),
                c: PropertyExplanation.Different({}),
            },
        }),
    );

    t.end();
});
