import { ofType, unionize } from 'unionize';

export const Explanation = unionize({
    ObjectSame: ofType<{}>(),
    ObjectDifferent: ofType<{
        explanation: ObjectDifferentExplanation;
    }>(),
    PropertiesSame: ofType<{}>(),
    PropertiesDifferent: ofType<{
        explanation: PropertiesExplanation<string>;
    }>(),
});
export type Explanation = typeof Explanation._Union;

export const ObjectDifferentExplanation = unionize({
    NotObjectOrNull: ofType<{}>(),
    NonMatchingKeys: ofType<{}>(),
});
type ObjectDifferentExplanation = typeof ObjectDifferentExplanation._Union;

export const PropertyExplanation = unionize({
    Same: ofType<{}>(),
    Different: ofType<{}>(),
});
export type PropertyExplanation = typeof PropertyExplanation._Union;

export type PropertiesExplanation<Keys extends string> = Record<
    Keys,
    PropertyExplanation
>;
