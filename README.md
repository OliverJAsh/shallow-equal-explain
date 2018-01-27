# shallow-equal-explain

This package provides a `shallowEqualExplain` function which is a copy of the [`shallowEqual` function used by React's `PureComponent`](https://github.com/facebook/fbjs/blob/7da8335b78d669cba263760872f0a45ed16b4d12/packages/fbjs/src/core/shallowEqual.js#L39), but instead of returning a boolean, it returns an object explaining the difference.

This is useful when you're trying to debug `PureComponent`s, or any use of `shallowEqual` for that matter.

`shallowEqualExplain` has type:

``` ts
function shallowEqualExplain<A, B>(objA: A, objB: B): Explaination;
```

`Explaination` is defined as:

``` ts
type Explaination = TopLevelSame | TopLevelDifferent | PropertiesSame | PropertiesDifferent
```

`TopLevelDifferent` and `PropertiesDifferent` provide further detail through their `explaination` properties, which have types `TopLevelDifferentExplaination` and `PropertiesExplaination` respectively:

``` ts
type TopLevelDifferentExplaination = NotObjectOrNull | NonMatchingKeys

type PropertyExplaination = Same | Different
type PropertiesExplaination<Keys extends string> = { [key in keys]: Same | Different };
```

## Example

``` ts
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
```

## Installation

```
yarn add shallow-equal-explain
```

## Usage

``` ts
import { shallowEqualExplain } from 'shallow-equal-explain';

shallowEqualExplain({ a: 1, b: 2, c: {} }, { a: 1, b: 2, c: {} });
```

With React:

``` tsx
class MyComponent extends React.Component {
    componentDidUpdate(prevProps) {
        const currentProps = this.props;
        const shallowEqualExplaination = shallowEqualExplain(prevProps, currentProps);

        console.log({ prevProps, currentProps, shallowEqualExplaination });
    }

    render () {
        return <div>My component</div>
    }
}
```

[See the tests](./tests/index.ts) for a full set of examples.

## Development

```
yarn
npm run start
```
