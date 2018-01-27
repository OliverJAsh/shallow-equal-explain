import { ofType, unionize } from 'unionize';

export const Explaination = unionize({
    TopLevelSame: ofType<{}>(),
    TopLevelDifferent: ofType<{
        explaination: TopLevelDifferentExplaination;
    }>(),
    PropertiesSame: ofType<{}>(),
    PropertiesDifferent: ofType<{
        explaination: PropertiesExplaination<string>;
    }>(),
});
export type Explaination = typeof Explaination._Union;

export const TopLevelDifferentExplaination = unionize({
    NotObjectOrNull: ofType<{}>(),
    NonMatchingKeys: ofType<{}>(),
});
type TopLevelDifferentExplaination = typeof TopLevelDifferentExplaination._Union;

export const PropertyExplaination = unionize({
    Same: ofType<{}>(),
    Different: ofType<{}>(),
});
export type PropertyExplaination = typeof PropertyExplaination._Union;

export type PropertiesExplaination<Keys extends string> = Record<
    Keys,
    PropertyExplaination
>;
