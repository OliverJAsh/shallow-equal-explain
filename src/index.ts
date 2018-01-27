// Copied from https://github.com/facebook/fbjs/blob/7da8335b78d669cba263760872f0a45ed16b4d12/packages/fbjs/src/core/shallowEqual.js#L39

// tslint:disable-next-line no-unbound-method
const hasOwnProperty = Object.prototype.hasOwnProperty;

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

export function shallowEqual<A, B>(objA: A, objB: B): boolean {
    if (is(objA, objB)) {
        return true;
    }

    if (
        typeof objA !== 'object' ||
        objA === null ||
        typeof objB !== 'object' ||
        objB === null
    ) {
        return false;
    }

    type AKey = keyof typeof objA;
    type BKey = keyof typeof objB;

    // tslint:disable-next-line no-any
    const keysA = (Object.keys(objA) as any) as AKey[];
    // tslint:disable-next-line no-any
    const keysB = (Object.keys(objB) as any) as BKey[];

    if (keysA.length !== keysB.length) {
        return false;
    }

    // Test for A's keys different from B.
    for (let i = 0; i < keysA.length; i++) {
        if (
            !hasOwnProperty.call(objB, keysA[i]) ||
            // tslint:disable-next-line no-any
            !is(objA[keysA[i]], ((objB as any) as A)[keysA[i]])
        ) {
            return false;
        }
    }

    return true;
}
