import { ofType, unionize } from 'unionize';

export const Explanation = unionize({
    TopLevelSame: ofType<{}>(),
    TopLevelDifferent: ofType<{
        explanation: TopLevelDifferentExplanation;
    }>(),
    PropertiesSame: ofType<{}>(),
    PropertiesDifferent: ofType<{
        explanation: PropertiesExplanation<string>;
    }>(),
});
export type Explanation = typeof Explanation._Union;

export const TopLevelDifferentExplanation = unionize({
    NotObjectOrNull: ofType<{}>(),
    NonMatchingKeys: ofType<{}>(),
});
type TopLevelDifferentExplanation = typeof TopLevelDifferentExplanation._Union;

export const PropertyExplanation = unionize({
    Same: ofType<{}>(),
    Different: ofType<{}>(),
});
export type PropertyExplanation = typeof PropertyExplanation._Union;

export type PropertiesExplanation<Keys extends string> = Record<
    Keys,
    PropertyExplanation
>;
