export const soundObjectKeys = <T>(t: T): Array<keyof T> =>
    (Object.keys(t) as {}) as Array<keyof T>;
