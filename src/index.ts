import { fromPairs, values } from 'ramda';

import {
    Explaination,
    PropertiesExplaination,
    PropertyExplaination,
    TopLevelDifferentExplaination,
} from './types';
import { soundObjectKeys } from './typescript-helpers';

// The following function is copied from
// https://github.com/facebook/fbjs/blob/7da8335b78d669cba263760872f0a45ed16b4d12/packages/fbjs/src/core/shallowEqual.js#L22

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
// tslint:disable-next-line no-any
function is(x: any, y: any): boolean {
    // SameValue algorithm
    if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        // Added the nonzero y check to make Flow happy, but it is redundant
        // return x !== 0 || y !== 0 || 1 / (x as number) === 1 / (y as number);
        return x !== 0 || y !== 0 || 1 / x === 1 / y;
    } else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
    }
}

export function shallowEqualExplain<A, B>(objA: A, objB: B): Explaination {
    if (is(objA, objB)) {
        return Explaination.TopLevelSame({});
    }

    if (
        typeof objA !== 'object' ||
        objA === null ||
        typeof objB !== 'object' ||
        objB === null
    ) {
        return Explaination.TopLevelDifferent({
            explaination: TopLevelDifferentExplaination.NotObjectOrNull({}),
        });
    }

    const keysA = soundObjectKeys(objA);
    const keysB = soundObjectKeys(objB);

    if (keysA.length !== keysB.length) {
        return Explaination.TopLevelDifferent({
            explaination: TopLevelDifferentExplaination.NonMatchingKeys({}),
        });
    }

    type AKey = keyof typeof objA;
    // Test for A's keys different from B.
    const propertiesExplaination = fromPairs(
        keysA.map((keyA): [string, PropertyExplaination] => {
            const areSame = is(
                objA[keyA],
                // To access keys from object a inside object b, we must cast the type.
                ((objB as {}) as A)[keyA],
            );

            const explaination = areSame
                ? PropertyExplaination.Same({})
                : PropertyExplaination.Different({});
            return [keyA, explaination];
        }),
    ) as PropertiesExplaination<AKey>;

    const areSomePropertiesDifferent = values(propertiesExplaination).some(
        PropertyExplaination.is.Different,
    );

    return areSomePropertiesDifferent
        ? Explaination.PropertiesDifferent({
              explaination: propertiesExplaination,
          })
        : Explaination.PropertiesSame({});
}
